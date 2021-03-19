// import { parse } from '../compile';
// import { layout } from '../template/layout';
//
// console.info(parse(layout));

import { resolve } from './resolve';
import dsl from './template/dsl.json';

resolve(dsl as any);
