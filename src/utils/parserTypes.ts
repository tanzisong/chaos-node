type TagName = string;
type TextData = string;

export type PropValue = string | true;
export type PropName = string;

interface Props {
  [key: string]: PropValue;
}

type AST = AstNode[];

export interface AstNode {
  tag: string;
  props: Props;
  children: AST;
}

export interface ParserContext extends Position {
  readonly originSource: string;
  source: string;
}

export interface SourceLocation {
  start: Position;
  end: Position;
  source: string;
}

export interface Position {
  offset: number; // from start of file
  line: number;
  column: number;
}

const enum Quoted {
  single = "'",
  double = '"',
}

const enum TagType {
  Start,
  End,
}

export { Quoted, AST, TagType, TagName, TextData, Props };
