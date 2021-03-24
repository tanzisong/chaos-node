import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';

const fileName = 'chaos.dsl';

export default {
  input: 'index.ts',
  output: [
    {
      file: `dist/lib/${fileName}.es5.js`,
      format: 'es',
      sourcemap: true,
    },
    {
      file: `dist/lib/${fileName}.umd.js`,
      format: 'umd',
      sourcemap: true,
    },
  ],
  watch: {
    exclude: 'node_modules/**',
  },
  // external: ['vue'],
  external: [],
  plugins: [
    string({
      include: '**/*.xml',
    }),
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    resolve(),
    sourcemaps(),
  ],
};
