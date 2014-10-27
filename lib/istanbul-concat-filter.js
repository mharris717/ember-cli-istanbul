var Istanbul = require('istanbul')
var instrumenter = new Istanbul.Instrumenter({noCompact: true, embedSource: false})

var shouldInstrument = function(string,phase,ops) {
  var whitelist = ["models","components","controllers","routes"]
  var appName = ops.appName;

  if (ops.moduleName.match("page-numbers")) {
    return false
  }

  for(var i=0;i<whitelist.length;i++) {
    var sub = whitelist[i]
    if (ops.moduleName.match(appName+"/"+sub)) {
      return true
    }
  }
  return false
}

var beforeFunc = function(string,phase,ops) {
  if (phase === 'beforeEvalWrap') {
    var root = process.cwd()
    // console.log(root)
    // sdfsdfsdfsd()
    var transpiledPath = root + "/transpiled_js/" + ops.moduleName + ".js"

    if (shouldInstrument(string,phase,ops)) {
      console.log("doing " + ops.moduleName + " " + transpiledPath);
      var res = instrumenter.instrumentSync(string, transpiledPath);
      res = res.replace("Function(\'return this\')","Function(\'return thisBeforeEval\')");
      return res;
    }
    else {
      console.log("skipping " + ops.moduleName);
      return string;
    }
    
  }
  else if (phase === 'afterEvalWrap') {
    var res = "thisBeforeEval = this; " + string;
    return res;
  }
  else {
    throw "unknown phase " + phase;
  }
};

module.exports = function(appName) {
  return function(string,phase,ops) {
    ops.appName = appName;
    return beforeFunc(string,phase,ops);
  }
}