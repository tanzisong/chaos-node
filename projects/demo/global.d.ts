import { CompilerOptions } from '@vue/compiler-dom';
import { RenderFunction } from '@vue/runtime-dom';

declare module 'vue/dist/vue.esm-bundler.js' {
  export function compile(template: string | HTMLElement, options?: CompilerOptions): RenderFunction;
}
