import { AST, AstNode, ParserContext, PropName, Props, PropValue, SourceLocation, Tag, Quoted } from './types';

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
  console.info('warnCode', code);
}

// 可以写一个parse errorCode枚举,将parse过程中 error抽离出来

function parse(context: ParserContext, ancestors: AST[] = []) {
  const nodes: AstNode[] = [];

  if (!isEnd(context, ancestors)) {
    const { source: s } = context;

    assert(s.length > 0, '大概率解析器的isEnd方法没有将情况枚举全, 这里不应该报错的');

    let node; // todo 补充类型

    if (s[0] === '<') {
      if (s.length === 1) {
        emitError(1, '不合法的标签');
      } else if (s[1] === '!') {
        // todo 可以支持下注释的解析, 注释的范式<!--xxx-->
        emitError(2);
      } else if (/[a-z]/i.test(s[1])) {
        // 节点名第一个字符只能是字母(不区分大小写)
        parseElement(context, ancestors);
      } else if (s[1] === '/') {
        // 标签结束标识</xxx>
      } else {
        // 使用了不支持的符号, 无法识别
        emitError(3, '标签名错误');
      }
    } else {
      // todo 如果标签中使用了 &gt; &lt; 等方式写标签可以增加一个解析或者直接明确报错信息
    }

    if (!node) {
      // fixme 这里的parseText实际返回的是context, 需要修改parseText返回值
      node = parseTagStart(context);
    }
  }
}

// 解析节点
function parseElement(context: ParserContext, ancestors: AST[]) {
  const parent = last(ancestors);
  const element = parseTag(context, parent);
}

// 解析标签
function parseTag(context: ParserContext, parent?: AST) {
  const { source: s } = context;
  const match = /^<\/?([a-z][^\s />]*)/i.exec(s)!;
  const tag = match[1];

  removeToken(context, match[0].length);
  removeSpaces(context);
  const props = parseAttributes(context);
  // todo
}

/**
 * 解析标签属性
 * */
function parseAttributes(context: ParserContext): Props[] {
  const props: Props[] = [];
  const propNames = new Set<string>();

  while (context.source.length > 0 && !context.source.startsWith('/>') && !context.source.startsWith('>')) {
    if (context.source.startsWith('/')) {
      emitWarn(0, '属性中错误的放置了/符号, 程序已自动纠错, 需要改下');
      removeToken(context, 1);
      removeSpaces(context);
      continue;
    }

    removeSpaces(context);
    const prop = parseAttribute(context, propNames);
    propNames.add(prop.name);
    props.push(prop);
  }
  console.info('props', props, '\n', JSON.parse(JSON.stringify(context)));
  return props;
}

/**
 * 解析标签单个属性名&值
 * */
function parseAttribute(context: ParserContext, propNames: Set<string>): Props {
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
    debugger;
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
    value,
  } as Props;
}

function parseAttributeValue(context: ParserContext): PropValue | null {
  const quoted = /^['"]/.test(context.source) ? context.source[0] : null;

  if (quoted) {
    let match: RegExpMatchArray | null;

    // 支持propsValue表达式
    if (quoted === Quoted.single) {
      // 匹配单引号包裹的字符
      match = context.source.match(/(?<=')[^/>]+?(?=')/);
    } else {
      // 匹配双引号包裹的字符
      match = context.source.match(/(?<=")[^/>]+?(?=")/);
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

// 将指针指向<字符的位置, 切除无用字符
// todo 返回node还没写
function parseTagStart(context: ParserContext) {
  const endToken = '<';
  const { source: s, originSource } = context;
  let endIndex = s.length;

  let index = s.indexOf(endToken);
  if (index !== -1) {
    endIndex = index;
  }

  assert(endIndex > 0, `template: ${s}\n parse失败 \n 解析前template为:${originSource}`);

  removeToken(context, endIndex);
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
  context.column = newColumnLine === -1 ? context.column + numberOfCharacters : numberOfCharacters - newColumnLine;
  context.source = s.slice(numberOfCharacters);
}

/**
 * 判断是否遇到结束标签</xxx>
 * */
function isEnd(context: ParserContext, ancestors: AST[]) {
  const s = context.source;

  if (s.startsWith('</')) {
    return !!ancestors.find((node) => {
      const tag = node.tag.toLowerCase();
      const sourceTag = s.substring(2, tag.length + 2).toLowerCase();
      return tag === sourceTag && /[\s>]/.test(s[2 + tag.length]);
    });
  }

  return !s;
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

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

export { parse, genContext };
// parse(genContext(layout));
