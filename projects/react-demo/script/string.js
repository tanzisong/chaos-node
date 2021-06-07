module.exports = function (source) {
  console.info('source', source);

  this.callback(null, 'module.exports = ' + JSON.stringify(source));
};
