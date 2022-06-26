import {
  AST,
  AstNode,
  ParserContext,
  PropName,
  Props,
  PropValue,
  Quoted,
  TagType,
  TextData,
} from './types';
import { removeKeyFromObj } from '@chaos/sdk';

function assert(condition: boolean, msg?: string): never | true {
  if (!condition) {
    throw new Error(msg || 'parse中断, 位置错误');
  }
  return true;
}

function emitError(code: number, message?: string) {
  console.info('errorCode', code, message);
  throw new Error(String(code));
}

function emitWarn(code: number, message?: string) {
  console.info('warnCode', code, message);
}

function parse(context: ParserContext, ancestors: AST = []): AST {
  const nodes: AST = [];
  let tagType = TagType.Start;

  while (!isEnd(context, ancestors)) {
    removeSpaces(context);
    const { source: s } = context;

    assert(s.length > 0, '大概率解析器的isEnd方法没有将情况枚举全, 这里不应该报错的');

    let node: AstNode | null = null;
    let innerText: TextData = ''; // innerText属于父组件的属性, 如果不存在父组件,则报错

    if (s[0] === '<') {
      if (s.length === 1) {
        emitError(1, '不合法的标签');
      } else if (s[1] === '!') {
        // todo 可以支持下注释的解析, 注释的范式<!--xxx-->
        emitError(2, '暂不支持注释');
      } else if (/[a-z]/i.test(s[1])) {
        // 节点名第一个字符只能是字母(不区分大小写)
        node = parseElement(context, ancestors);
      } else if (s[1] === '/') {
        tagType = TagType.End;
        parseTag(context, TagType.End);
      } else {
        // 使用了不支持的符号, 无法识别
        emitError(3, '标签名未知错误');
      }
    }

    if (!node && tagType === TagType.Start) {
      innerText = parseText(context);
      const length = ancestors.length;

      if (!length) {
        emitError(12, '文字节点不可单独存在');
      }

      const props = ancestors[length - 1].props;
      props.innerText && emitWarn(1, `innerText属性和text节点重复, 默认innerText被覆盖`);
      props.innerText = innerText;
    }

    nodes.push(node!);
  }

  return nodes.filter((node) => !!node);
}

/**
 * 解析节点
 * */
function parseElement(context: ParserContext, ancestors: AST): AstNode {
  const element = parseTag(context, TagType.Start);

  const { isSelfClosing, ...ASTNode } = element;

  if (isSelfClosing) {
    return ASTNode;
  }

  // push children
  ancestors.push(ASTNode);
  const children = parse(context, ancestors);
  ancestors.pop();

  element.children = children;

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End);
  } else {
    emitError(13, `未正确闭合标签\n${context.source}`);
  }

  return removeKeyFromObj(element, ['isSelfClosing']);
}

// 解析标签
function parseTag(context: ParserContext, type: TagType): AstNode & { isSelfClosing: boolean } {
  const match = /^<\/?([a-z][^\s />]*)/i.exec(context.source)!;
  if (!match) {
    emitError(14, `标签名格式定义错误\n${context}`);
  }
  const tag = match[1];

  removeToken(context, match[0].length);
  removeSpaces(context);
  let props = {};
  type === TagType.Start && (props = parseAttributes(context));

  let isSelfClosing = false;
  if (context.source.length === 0) {
    emitError(9, `没有正确的关闭标签\n${context.source}`);
  } else {
    isSelfClosing = context.source.startsWith('/>');

    if (type === TagType.End && isSelfClosing) {
      emitError(10, `结束标签名写错了\n${context.source}`);
    }

    removeToken(context, isSelfClosing ? 2 : 1);
  }

  return {
    tag,
    props,
    isSelfClosing,
    children: [],
  };
}

/**
 * 解析标签属性
 * */
function parseAttributes(context: ParserContext): Props {
  const props: Props = {};
  const propNames = new Set<PropName>();

  while (
    context.source.length > 0 &&
    !context.source.startsWith('/>') &&
    !context.source.startsWith('>')
  ) {
    if (context.source.startsWith('/')) {
      emitWarn(0, '属性中错误的放置了/符号, 程序已自动纠错, 需要改下');
      removeToken(context, 1);
      removeSpaces(context);
      continue;
    }

    const { name, value } = parseAttribute(context, propNames);
    propNames.add(name);
    props[name] = value;
    removeSpaces(context);
  }

  return props;
}

/**
 * 解析标签单个属性名&值
 * */
function parseAttribute(
  context: ParserContext,
  propNames: Set<PropName>,
): {
  name: PropName;
  value: PropValue;
} {
  const match = /^[^\s />][^\s/>=]*/.exec(context.source)!;

  if (!match) {
    emitError(8, `正常情况下这里不应该报错, compile代码有问题, 场景没有枚举全\n${context.source}`);
  }

  const propName = match[0];

  if (propNames.has(propName)) {
    // 存在同名属性
    emitError(5, `存在同名属性:[${propName}]\n${context.source}`);
  }
  propNames.add(propName);

  if (propName[0] === '=') {
    // 验证不合法的属性名
    emitError(6, `属性名错误,不能使用=开头\n${context.source}`);
  }

  if (/["'<]/g.test(propName)) {
    // 验证不合法的属性名
    emitError(7, `属性名错误, 不能包含"'<\n${context.source}`);
  }

  removeToken(context, propName.length); // 删除已匹配过的propName

  let value: PropValue | null;

  if (/^[\s]*=/.test(context.source)) {
    // 匹配propValue
    removeSpaces(context);
    removeToken(context, 1); // 删除=字符
    removeSpaces(context);

    value = parseAttributeValue(context); // 解析属性值
  } else {
    // 只有一个propName, 则将propValue默认处理成true
    value = true;
  }

  if (value === null) {
    assert(false, '属性值不能为空');
  }

  return {
    name: propName,
    value: value!,
  };
}

/**
 * 解析prop value
 * todo 还需要在写一个value编译器
 * */
function parseAttributeValue(context: ParserContext): PropValue | null {
  const quoted = /^['"]/.test(context.source) ? context.source[0] : null;
  if (quoted) {
    let match: RegExpMatchArray | null;

    // 支持propsValue表达式
    if (quoted === Quoted.single) {
      // 匹配单引号包裹的字符
      match = context.source.match(/(?<=')[^/>]*?.*?(?=')/);
    } else {
      // 匹配双引号包裹的字符
      match = context.source.match(/(?<=")[^/>]*?.*?(?=")/);
    }

    if (match) {
      // 正常匹配到value
      const value = match[0];
      removeToken(context, value.length + 2);
      return value;
    } else {
      if (context.source[0] === quoted && context.source[1] === quoted) {
        // 匹配到的value是空字符串
        removeToken(context, 2);
        return '';
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
}

function parseText(context: ParserContext): TextData {
  removeSpaces(context);
  const endToken = '<';
  const { source: s } = context;
  let endIndex = s.length;

  let index = s.indexOf(endToken);
  if (index !== -1) {
    endIndex = index;
  }

  return parseTextData(context, endIndex);
}

function parseTextData(context: ParserContext, length: number): TextData {
  const textData = context.source.slice(0, length);
  removeToken(context, length);
  const textMatch = textData.match(/[^\s][\S\s]*[^\s]/g)!;

  if (!textMatch) {
    emitError(11, `可能因为parseTextData的正则考虑不完善\n${context}`);
  }
  removeSpaces(context);

  return textMatch[0];
}

/**
 * 删除回车/空格等字符
 * */
function removeSpaces(context: ParserContext) {
  const { source: s } = context;
  const match = /^[\s]*/.exec(s);
  match && removeToken(context, match[0].length);
}

/**
 * 删除指定长度的字符, 移动指针
 * */
function removeToken(context: ParserContext, numberOfCharacters: number): void {
  const { source: s } = context;

  assert(numberOfCharacters <= s.length, '被切割字符比原字符长或者一样长:removeToken方法报错');

  let newLine = 0;
  let newColumnLine = -1;
  for (let i = 0; i < numberOfCharacters; i++) {
    if (s.charCodeAt(i) === 10) {
      // 换行符
      newLine++;
      newColumnLine = i;
    }
  }

  context.offset += numberOfCharacters;
  context.line += newLine;
  context.column =
    newColumnLine === -1 ? context.column + numberOfCharacters : numberOfCharacters - newColumnLine;
  context.source = s.slice(numberOfCharacters);
}

/**
 * 判断标签是否已经递归到结束标签
 * */
function isEnd(context: ParserContext, ancestors: AST) {
  removeSpaces(context);
  const s = context.source;

  if (s.startsWith('</')) {
    for (let i = ancestors.length - 1; i >= 0; --i) {
      if (startsWithEndTagOpen(s, ancestors[i].tag)) {
        return true;
      }
    }
  }

  return !s;
}

/**
 * 判断是否遇到结束标签</xxx>
 * */
function startsWithEndTagOpen(source: string, tag: string): boolean {
  return (
    source.startsWith('</') &&
    source.substr(2, tag.length).toLowerCase() === tag.toLowerCase() &&
    /[\t\r\n\f />]/.test(source[2 + tag.length] || '>')
  );
}

function genContext(layout: string): ParserContext {
  return {
    originSource: layout,
    source: layout,
    offset: 0,
    line: 1,
    column: 1,
  };
}

export { parse, genContext };
