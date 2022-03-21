import fs from 'fs';
import path from 'path';
import {parse} from '@babel/parser';
import {transformFromAst} from '@babel/core';
import { isStringLiteral, isNullLiteral, isBooleanLiteral, isNumberLiteral, isExpression } from "@babel/types"

import {parse as xmlParser, genContext} from '../utils/parse';
import {AST, AstNode, PropValue} from '../utils/parserTypes';
import {CompileErrorCode} from '../utils/ErrorCode';
import {isArray, isFalsyOrEmptyObject} from '../utils/tools';
import {JsonPath} from '../utils/compileTypes';
import { isObjectLiteral, isArrayLiteral, isUndefinedLiteral } from '../utils/Compile';

class Compile {
  constructor() {
    const xmlString = fs.readFileSync(path.resolve(__dirname, '../../../public/xml/', 'test.xml'), {
      encoding: 'utf-8',
    });
    
    const json = this.compileXml(xmlString);
    
    const expressionsMap = this.getExpressionFromAst(json);
    
    /**
     * 首先必须是一个表达式: isExpression, 如果不是表达式, 则直接替换原值即可, 无需编译
     *
     *
     * 不需要编译的类型, 直接用常量替换, 减少运行时编译
     * string
     * number
     * boolean
     * null
     * isStringLiteral, isNullLiteral, isBooleanLiteral, isNumberLiteral
     *
     * isUndefinedLiteral
     * isObjectLiteral
     * isArrayLiteral
     *
     * 只需要编译表达式
     * */
    
    // forEach 兼容xml多root节点
    expressionsMap.forEach(map => {
      for (let entry of map.entries()) {
        const [key, value] = entry
        console.info("key: value", JSON.stringify(key), value, typeof value);
        console.log('\n');
      }
      
      console.log('------\n\n\n');
    })
    
    // const AST = parse(JSON.stringify(json));
    //
    // // @ts-ignore
    // const { code } = transformFromAst(AST, '', {
    //   // @ts-ignore
    //   presets: ['@babel/preset-env'],
    // });
    //
    // console.info('巴拉巴拉巴拉', JSON.stringify(code));
  }
  
  /**
   * 将 xml 编译为 json
   * */
  public compileXml(xml: string) {
    let json: AST;
    try {
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
        map.set([...path, "props", propKey], props[propKey]);
      });
    }
    
    if (isArray(children)) {
      children.forEach((child, childIndex) => {
        this.recursionGetExpression(child, [...path, 'children', childIndex], map);
      })
    }
    
    return map;
  }
}

new Compile();

// export default new Compile();
