#!/bin/node
const fs = require('fs');
const chalk = require('chalk');

const msgPath = process.env.GIT_PARAMS || '';
const commitMsg = fs.readFileSync(msgPath, 'utf-8').trim();

console.info('commitMsg__输出', commitMsg);

const regCommitMsg =
  /(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: (.{1,50})/;

if (!regCommitMsg.test(commitMsg)) {
  console.error(
    `${chalk.red('commit信息格式错误')}${chalk.cyan(
      '\n举例: \n<header-type>(<header-scope>): <header-subject>\n<body>\n<footer>',
    )}`,
  );
  process.exit(1);
}
