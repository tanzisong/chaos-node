#!/usr/bin/env node

console.info('11');
const extend = Object.assign;
console.info(extend({ a: 1 }, { b: 1 }));

/**
 * react-demo已具备的功能
 *
 * 根据配置设置浏览器tab icon & name
 * 将xml文件编译为字符串(用的webpack plugin)
 * InitSystem
 * new History();
 * */
