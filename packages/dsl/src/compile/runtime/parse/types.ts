export type Tag = string;

export type PropValue = string | true;
export type PropName = string;

export interface Props {
  name: PropName;
  value: PropValue;
}

export interface AST {
  tag: string;
  props: Props[];
  children: AST[];
}

// todo 还不知道要写啥
export interface AstNode {
  [key: string]: any;
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

enum Quoted {
  single = "'",
  double = '"',
}

export { Quoted };
