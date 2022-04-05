import { set } from 'lodash';
import { parse, parseExpression } from '@babel/parser';
import generate from '@babel/generator';
import { transformFromAst } from '@babel/core';
import {
  isStringLiteral,
  isNullLiteral,
  isBooleanLiteral,
  isNumericLiteral,
  isExpressionStatement,
  program,
  emptyStatement,
  expressionStatement,
  nullLiteral,
  FunctionDeclaration,
  isArrayExpression,
  isObjectExpression,
} from '@babel/types';

import { parse as xmlParser, genContext } from '../utils/parse';
import { AST, AstNode, PropValue } from '../utils/parserTypes';
import { CompileErrorCode } from '../utils/ErrorCode';
import { isArray, isFalsyOrEmptyObject } from '../utils/tools';
import { ExtraConfig, JsonPath } from '../utils/compileTypes';

class Compile {
  constructor() {
  }
  
  public Run(xmlString: string) {
    /**
     * for test
     * const xmlString = fs.readFileSync(path.resolve(__dirname, '../../../public/xml/', 'test.xml'), {
     *  encoding: 'utf-8',
     * });
     * */
    
    /** 获取xml对应json结构 */
    const compiledJson = this.compileXml(xmlString);
    
    /** 从json结构中获取props value表达式 */
    const expressionsMaps = this.getExpressionFromAst(compiledJson);
    // 标准xml支持是单root节点, 这里按照标准来处理
    const expressionsMap = expressionsMaps[0];
    
    /** 构造json extra配置对象 */
    const extraConfig: ExtraConfig = {
      polyfillCode: '',
    };
    
    // compiledJson第一项为编译后json, 第二项为render配置
    compiledJson.push(extraConfig as any);
    
    /**
     * 构造一个空esTree AST
     * 并且将空表达式嵌入, 为了解决parse将string表达式当做js文件头部声明的问题
     * */
    const programAST = program([emptyStatement()]);
    for (let entry of expressionsMap.entries()) {
      const [_path, code] = entry;
      // 编译每一个表达式
      try {
        const expressionAST = parseExpression(code as string);
        // 将表达式AST合并到esTree AST中
        programAST.body.push(expressionStatement(expressionAST));
      } catch (_) {
        // 为保证表达式顺序, 解析失败后塞入Null节点
        const nullLiteralAST = nullLiteral();
        programAST.body.push(expressionStatement(nullLiteralAST));
      }
    }
    
    /**
     * 利用babel能力, 将AST编译, 去转义es6+语法
     * */
      // @ts-ignore
    const { code: transformedCode } = transformFromAst(programAST, '', {
        // @ts-ignore
        presets: ['@babel/preset-env'],
      });
    const transformedAST = parse(transformedCode).program.body;
    
    /**
     * 根据原表达式个数, 从parse结果中分离polyfill函数
     * */
    const polyfillASTLength = transformedAST.length - expressionsMap.size - 1;
    // polyfill表达式AST
    const polyfillASTs = transformedAST.slice(0, polyfillASTLength) as FunctionDeclaration[];
    // 去掉空节点的原表达式AST
    const originalExpressionAST = transformedAST.slice(polyfillASTLength + 1, transformedAST.length);
    
    /**
     * 遍历originalExpressionAST, 生成对应code, 并且替换原有json中表达式
     * */
    const expressionsPathAndValue = [...expressionsMap.entries()];
    originalExpressionAST.forEach((ast, index) => {
      // 不需要编译的类型, 直接用常量替换, 减少运行时编译(generate)
      if (
        !isExpressionStatement(ast) ||
        isStringLiteral(ast) ||
        isNumericLiteral(ast) ||
        isBooleanLiteral(ast) ||
        isNullLiteral(ast) ||
        isObjectExpression(ast) ||
        isArrayExpression(ast)
      ) {
        // 此类型下, 无需更改json中原值
        return;
      }
      
      // 获取表达式对应在json中的path路径
      const expressionsPath = expressionsPathAndValue[index][0];
      const code = generate(ast, { compact: true, minified: true }).code;
      
      // 获取原始编译后json
      const originalJson = compiledJson[0];
      // 根据路径设置json中表达式的值
      set(originalJson, expressionsPath, code);
    });
    
    // 遍历polyfillAST, 生成对应code
    const newPolyfillAST = program([]);
    newPolyfillAST.body.push(...polyfillASTs);
    // @ts-ignore
    const { code: PolyfillCode } = transformFromAst(newPolyfillAST, '', {
      // @ts-ignore
      compact: true,
      minified: true,
    });
    extraConfig.polyfillCode = PolyfillCode;
    
    return compiledJson as [AstNode, ExtraConfig];
  }
  
  /**
   * 将 xml 编译为 json
   * */
  public compileXml(xml: string) {
    let json: AST;
    try {
      console.info("xml", xml);
      json = xmlParser(genContext(xml));
    } catch (e: any) {
      throw new Error(`${CompileErrorCode.compileXml}\n${e.message}`);
    }
    
    return json;
  }
  
  /**
   * 从xml 编译产物AST中获取 props value
   * mapArr: Array<Map>, 编译 xml 方法支持解析多 root 节点 xml, 但是标准 xml 规定单节点
   * */
  public getExpressionFromAst(ast: AST) {
    const mapArr: Array<Map<Array<JsonPath>, PropValue>> = [];
    
    ast.forEach(AstNode => {
      const map = new Map<Array<JsonPath>, PropValue>();
      
      this.recursionGetExpression(AstNode, [], map);
      
      mapArr.push(map);
    });
    
    return mapArr;
  }
  
  /**
   * 递归获取 AstNode props value
   * */
  private recursionGetExpression(node: AstNode, path: Array<JsonPath>, map: Map<Array<JsonPath>, PropValue>) {
    const props = node.props;
    const children = node.children;
    
    if (!isFalsyOrEmptyObject(props)) {
      Object.keys(props).forEach((propKey) => {
        map.set([...path, 'props', propKey], props[propKey]);
      });
    }
    
    if (isArray(children)) {
      children.forEach((child, childIndex) => {
        this.recursionGetExpression(child, [...path, 'children', childIndex], map);
      });
    }
    
    return map;
  }
}

export default new Compile();
