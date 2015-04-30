require(['API/Semant'], function(Semant) {

  // Universal Module Definition (UMD) to support AMD,
  // CommonJS/Node.js, and plain browser loading
  
  // AMD
  if (typeof define === 'function' && define.amd) {
  	define([], function() { return Semant; });
  }
  // CommonJS/Node.js
  else if (typeof exports !== 'undefined'){
  	module.exports = Semant;
  }
  // Inline Browser Load
  else {
  	window.Semant = Semant;
  }

});