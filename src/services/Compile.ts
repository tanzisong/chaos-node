import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import { transformFromAst } from '@babel/core';

import { parse as xmlParser, genContext } from '../utils/parse';
import { AST, AstNode, PropValue } from '../utils/parserTypes';
import { CompileErrorCode } from '../utils/ErrorCode';
import { isArray, isFalsyOrEmptyObject } from '../utils/tools';
import { JsonPath } from '../utils/compileTypes';

class Compile {
  constructor() {
    const xmlString = fs.readFileSync(path.resolve(__dirname, '../../../public/xml/', 'test.xml'), {
      encoding: 'utf-8',
    });
    
    const json = this.compileXml(xmlString);
    
    this.getExpressionFromAst(json);
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
      console.info(JSON.stringify(json));
    } catch (e: any) {
      throw new Error(`${CompileErrorCode.compileXml}\n${e.message}`);
    }
    
    return json;
  }
  
  /**
   * 从xml 编译产物AST中获取 props value
   * */
  public getExpressionFromAst(ast: AST) {
    const mapArr: Map<Array<JsonPath>, PropValue>[] = [];
    
    ast.forEach(AstNode => {
      const map = new Map<Array<JsonPath>, PropValue>();
      
      this.recursionGetExpression(AstNode, [], map);
  
      for (let entry of map.entries()) {
        console.info("entry", JSON.stringify(entry));
      }
      
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
    
    if(isArray(children)) {
      children.forEach((child, childIndex) => {
        this.recursionGetExpression(child, [...path, 'children', childIndex], map);
      })
    }
    
    return map;
  }
}

new Compile();

// export default new Compile();
