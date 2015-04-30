;(function(window, document, navigator, undefined) {
var CORE_Entity_Entity, CORE_Exceptions_SemantException, CORE_Exceptions_createEntityException, API_createEntity, API_Semant;
CORE_Entity_Entity = function () {
  function Entity() {
  }
  return Entity;
}();
CORE_Exceptions_SemantException = function () {
  function SemantException() {
  }
  SemantException.prototype.toString = function () {
    return this.name + ' (' + this.code + ') : ' + this.notice;
  };
  SemantException.prototype.details = function () {
    return this.name + ' (' + this.code + ') : ' + this.message;
  };
  return SemantException;
}();
CORE_Exceptions_createEntityException = function () {
  var SemantException = CORE_Exceptions_SemantException;
  function createEntityException(message) {
    this.code = 0;
    this.name = 'Create entity failed';
    this.notice = 'Entity cannot be created';
    this.message = message;
  }
  createEntityException.prototype = new SemantException();
  return createEntityException;
}();
API_createEntity = function () {
  var Entity = CORE_Entity_Entity;
  var createEntityException = CORE_Exceptions_createEntityException;
  var createEntity = function (name) {
    if (typeof name === 'string') {
      var entity = new Entity(name);
      this.entityCollection.push();
      if (this.debug) {
        console.log('Entity \'' + name + '\' created.');
      }
      return entity;
    } else {
      throw new createEntityException('Argument of \'createEntity\' must be of type \'String\' and indicate the name of the entity.');
    }
  };
  return createEntity;
}();
API_Semant = function () {
  function Semant() {
    this.name = undefined;
    this.URI = undefined;
    this.debug = false;
    this.entityCollection = [];
  }
  Semant.prototype.createEntity = API_createEntity;
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
}(API_Semant));
}(typeof window !== "undefined" ? window : {}, typeof document !== "undefined" ? document : { createElement: function() {} }, typeof window !== "undefined" ? window.navigator : {}));