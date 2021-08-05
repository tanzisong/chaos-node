module.exports = function (source) {
  this.callback(null, 'module.exports = ' + JSON.stringify(source));
};
