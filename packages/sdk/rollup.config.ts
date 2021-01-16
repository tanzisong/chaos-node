import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';

const fileName = 'chaos.sdk';

export default {
  input: './index.ts',
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
    include: 'src/**',
  },
  external: [],
  plugins: [
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    resolve(),
    sourcemaps(),
  ],
};