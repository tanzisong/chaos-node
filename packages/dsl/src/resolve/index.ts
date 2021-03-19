export interface AST {
  tag: string;
  props: Props[];
  children: AST[];
}

export interface Props {
  name: string;
  value: string;
}

function resolve(dsl: AST) {
  console.info('dsl', dsl);
}

export { resolve };
