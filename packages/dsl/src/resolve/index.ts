import { h } from 'vue';

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
  return h(dsl.tag, '测试文字');
}

export { resolve };
