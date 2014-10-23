var Istanbul = require('istanbul')
var instrumenter = new Istanbul.Instrumenter({noCompact: true, embedSource: false})

var shouldInstrument = function(string,phase,ops) {
  var whitelist = ["models","components","controllers","routes"]
  for(var i=0;i<whitelist.length;i++) {
    var sub = whitelist[i]
    if (ops.moduleName.match("dummy/"+sub)) {
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
    var transpiledPath = root + "/transpiled_js3/" + ops.moduleName + ".js"

    if (shouldInstrument(string,phase,ops)) {
      //console.log("doing " + ops.moduleName);
      var res = instrumenter.instrumentSync(string, transpiledPath);
      res = res.replace("Function(\'return this\')","Function(\'return thisBeforeEval\')");
      return res;
    }
    else {
      //console.log("skipping " + ops.moduleName);
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

module.exports = beforeFunc