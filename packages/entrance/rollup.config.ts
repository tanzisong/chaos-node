import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import { parse } from 'postcss-scss';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';

const fileName = 'chaos.entrance';

export default {
  input: 'src/react/index.tsx',
  output: [
    {
      file: `dist/lib/${fileName}.umd.js`,
      name: fileName,
      format: 'umd',
      sourcemap: true,
    },
  ],
  watch: {
    exclude: 'node_modules/**',
  },
  external: ['vue', 'react'],
  plugins: [
    json(),
    postcss({
      extract: true,
      minimize: true,
      extensions: ['css', 'scss'],
      parser: parse,
      plugins: [autoprefixer({ add: true })],
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    resolve(),
    sourcemaps(),
    progress(),
  ],
};
