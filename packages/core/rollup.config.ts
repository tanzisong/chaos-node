import typescript from 'rollup-plugin-typescript2';
import sourcemaps from 'rollup-plugin-sourcemaps';
import camelcase from 'lodash.camelcase';

const libraryName = 'core-index';

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: `dist/${libraryName}.umd.js`,
      name: camelcase(libraryName),
      format: 'umd',
      sourcemap: true,
    },
    {
      file: `dist/${libraryName}.es5.js`,
      name: camelcase(libraryName),
      format: 'es',
      sourcemap: true,
    },
  ],
  // exclude the files package into the final file
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // compile ts files and use *.ts configuration file
    typescript({ useTsconfigDeclarationDir: true }),
    // open the sourcemap
    sourcemaps(),
  ],
};
