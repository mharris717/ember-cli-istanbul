var IstanbulFilter = require("./istanbul-filter")

function IstanbulPreprocessor(options) {
  this.name = 'ember-cli-istanbul';
  this.ext = 'js';
  this.options = options || {};
}

IstanbulPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
  //console.log("toTree");
  var options = {
    bare: true,
    srcDir: inputPath,
    destDir: outputPath
  };

  return IstanbulFilter(tree,options);
};

module.exports = IstanbulPreprocessor