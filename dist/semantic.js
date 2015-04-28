;(function(window, document, navigator, undefined) {
var semant;
semant = function () {
  var Semant = {
    'ping': 'pong',
    testRun: function () {
      console.log('helloo');
    }
  };
  return Semant;
}();
(function (Semant) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Semant;
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = Semant;
  } else {
    window.Semant = Semant;
  }
}(semant));
}(typeof window !== "undefined" ? window : {}, typeof document !== "undefined" ? document : { createElement: function() {} }, typeof window !== "undefined" ? window.navigator : {}));