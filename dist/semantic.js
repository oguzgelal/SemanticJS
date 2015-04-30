;(function(window, document, navigator, undefined) {
var SEMANTICS={debug:true};
var CORE_Entity_Entity, CORE_Exception_Exception, CORE_Exception_createEntityException, CORE_Entity_createEntity, CORE_Ontology_Ontology, CORE_Exception_createOntologyException, CORE_Ontology_createOntology, API_Semant;
CORE_Entity_Entity = function () {
  function Entity(name) {
    this.example = 'hey!';
  }
  return Entity;
}();
CORE_Exception_Exception = function () {
  function Exception() {
    this.code = undefined;
    this.name = undefined;
    this.notice = undefined;
    this.message = undefined;
  }
  Exception.prototype.toString = function () {
    return this.name + ' (' + this.code + ') : ' + this.notice;
  };
  Exception.prototype.details = function () {
    return this.name + ' (' + this.code + ') : ' + this.message;
  };
  return Exception;
}();
CORE_Exception_createEntityException = function () {
  var Exception = CORE_Exception_Exception;
  function createEntityException(message) {
    this.code = 0;
    this.name = 'Create entity failed';
    this.notice = 'Entity cannot be created';
    this.message = message;
    if (SEMANTICS.debug) {
      console.log(this.details());
    }
  }
  createEntityException.prototype = new Exception();
  return createEntityException;
}();
CORE_Entity_createEntity = function () {
  var Entity = CORE_Entity_Entity;
  var createEntityException = CORE_Exception_createEntityException;
  var createEntity = function (name) {
    if (typeof name !== 'string') {
      throw new createEntityException('Argument of \'createEntity\' must be of type \'String\' and indicate the name of the entity.');
    } else if (!this.name) {
      throw new createEntityException('Unique name of the ontology should be set before creating any entities.');
    } else if (!this.domain) {
      throw new createEntityException('Unique domain of the ontology should be set before creating any entities.');
    } else {
      var URI = this.domain + '#' + name;
      if (this.occupiedURIs.indexOf(URI) != -1) {
        throw new createEntityException('An entity with the same name already exists.');
      } else {
        this.occupiedURIs.push(URI);
        var entity = new Entity(name);
        this.entityCollection[name] = entity;
        if (this.debug) {
          console.log('Entity \'' + name + '\' created.');
        }
        return entity;
      }
    }
  };
  return createEntity;
}();
CORE_Ontology_Ontology = function () {
  function Ontology(name, domain) {
    this.name = name;
    this.domain = domain;
    this.entityCollection = {};
    this.occupiedURIs = [];
  }
  Ontology.prototype.createEntity = CORE_Entity_createEntity;
  return Ontology;
}();
CORE_Exception_createOntologyException = function () {
  var Exception = CORE_Exception_Exception;
  function createOntologyException(message) {
    this.code = 1;
    this.name = 'Create ontology failed';
    this.notice = 'Ontology cannot be created';
    this.message = message;
    if (SEMANTICS.debug) {
      console.log(this.details());
    }
  }
  createOntologyException.prototype = new Exception();
  return createOntologyException;
}();
CORE_Ontology_createOntology = function () {
  var Ontology = CORE_Ontology_Ontology;
  var createOntologyException = CORE_Exception_createOntologyException;
  var createOntology = function (name, domain) {
    if (typeof name !== 'string') {
      throw new createOntologyException('Name argument of \'createOntology\' must be of type \'String\'.');
    } else if (typeof domain !== 'string') {
      throw new createOntologyException('Domain argument of \'createOntology\' must be of type \'String\'.');
    } else {
      if (this.occupiedDomains.indexOf(domain) != -1) {
        throw new createOntologyException('An ontology with the same domain already exists.');
      } else {
        this.occupiedDomains.push(domain);
        var ontology = new Ontology(name, domain);
        var URI = domain + '/ontology/' + name;
        this.ontologies[URI] = ontology;
        if (this.debug) {
          console.log('Ontology \'' + name + '\' created.');
        }
        return ontology;
      }
    }
  };
  return createOntology;
}();
API_Semant = function () {
  function Semant() {
    this.ontologies = {};
    this.occupiedDomains = [];
  }
  Semant.prototype.createOntology = CORE_Ontology_createOntology;
  Semant.prototype.setDebug = function (debug) {
    if (typeof debug === 'boolean') {
      SEMANTICS.debug = debug;
    }
  };
  Semant.prototype.getDebug = function () {
    return SEMANTICS.debug;
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
}(API_Semant));
}(typeof window !== "undefined" ? window : {}, typeof document !== "undefined" ? document : { createElement: function() {} }, typeof window !== "undefined" ? window.navigator : {}));