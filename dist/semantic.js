;(function(window, document, navigator, undefined) {
var SEMANTICS={debug:true};
var CORE_Exception_Exception, CORE_Exception_createURIException, CORE_Utils_createURI, CORE_Utils_stripDomain, CORE_Utils_Utils, CORE_Exception_createEntityException, CORE_Entity_createSubEntity, CORE_Entity_Entity, CORE_Entity_createEntity, CORE_Ontology_Ontology, CORE_Exception_createOntologyException, CORE_Ontology_createOntology, API_Semant;
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
CORE_Exception_createURIException = function () {
  var Exception = CORE_Exception_Exception;
  function createURIException(message) {
    this.code = 0;
    this.name = 'URI generation failed';
    this.notice = 'URI cannot be created.';
    this.message = message;
    if (SEMANTICS.debug) {
      console.log(this.details());
    }
  }
  createURIException.prototype = new Exception();
  return createURIException;
}();
CORE_Utils_createURI = function () {
  var createURI = function (name, domain, path) {
    var createURIException = CORE_Exception_createURIException;
    if (typeof name !== 'string') {
      throw new createURIException('The name parameter should be of type string.');
    }
    if (typeof domain !== 'string') {
      throw new createURIException('The domain parameter should be of type string.');
    }
    if (typeof path !== 'string') {
      throw new createURIException('The path parameter should be of type string.');
    }
    if (!name || name && name.length === 0) {
      throw new createURIException('Name parameter not present or empty.');
    }
    if (!domain || domain && domain.length === 0) {
      throw new createURIException('Domain parameter not present or empty.');
    }
    if (!path || path && path.length === 0) {
      throw new createURIException('Path parameter not present or empty.');
    }
    if (domain.substring(domain.length - 1, domain.length) === '/') {
      domain = domain.substring(0, domain.length - 1);
    }
    if (path.substring(path.length - 1, path.length) === '/') {
      path = path.substring(0, path.length - 1);
    }
    if (path.substring(0, 1) === '/') {
      path = path.substring(1, path.length);
    }
    if (!domain.match(/(\w)*:\/\//gi)) {
      domain = 'http://' + domain;
    }
    return domain + '/' + path + '/' + name;
  };
  return createURI;
}();
CORE_Utils_stripDomain = function () {
  var stripDomain = function (domain) {
    if (domain.substring(domain.length - 1, domain.length) === '/') {
      domain = domain.substring(0, domain.length - 1);
    }
    if (!domain.match(/(\w)*:\/\//gi)) {
      domain = 'http://' + domain;
    }
    return domain;
  };
  return stripDomain;
}();
CORE_Utils_Utils = function () {
  var Utils = {
    createURI: CORE_Utils_createURI,
    stripDomain: CORE_Utils_stripDomain
  };
  return Utils;
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
CORE_Entity_createSubEntity = function () {
  var createSubEntity = function (name) {
    var Entity = CORE_Entity_Entity;
    var Utils = CORE_Utils_Utils;
    var createEntityException = CORE_Exception_createEntityException;
    if (typeof name !== 'string') {
      throw new createEntityException('Argument of \'createEntity\' must be of type \'String\' and indicate the name of the entity.');
    }
    if (!name || name && name.length === 0) {
      throw new createEntityException('Argument of \'createEntity\' is blank or empty.');
    }
    var URI = Utils.createURI(name, this.ontology.domain, 'entity');
    if (this.ontology.occupiedURIs.indexOf(URI) != -1) {
      throw new createEntityException('An entity with the same name already exists.');
    } else {
      this.ontology.occupiedURIs.push(URI);
      var entity = new Entity(name);
      entity.parent = this;
      entity.ontology = this.ontology;
      this.subs[name] = entity;
      this.ontology.entityCollection[name] = entity;
      if (SEMANTICS.debug) {
        console.log('Entity \'' + name + '\' created under the entity \'' + this.name + '\'.');
      }
      return entity;
    }
  };
  return createSubEntity;
}();
CORE_Entity_Entity = function () {
  function Entity(name) {
    this.type = 'entity';
    this.name = name;
    this.relOut = {};
    this.relIn = {};
    this.individuals = {};
    this.subs = {};
    this.parent = null;
    this.ontology = null;
  }
  Entity.prototype.createSubEntity = CORE_Entity_createSubEntity;
  return Entity;
}();
CORE_Entity_createEntity = function () {
  var createEntity = function (name) {
    var Entity = CORE_Entity_Entity;
    var Utils = CORE_Utils_Utils;
    var createEntityException = CORE_Exception_createEntityException;
    if (typeof name !== 'string') {
      throw new createEntityException('Argument of \'createEntity\' must be of type \'String\' and indicate the name of the entity.');
    }
    if (!name || name && name.length === 0) {
      throw new createEntityException('Argument of \'createEntity\' is blank or empty.');
    }
    if (!this.name) {
      throw new createEntityException('Unique name of the ontology should be set before creating any entities.');
    }
    if (!this.domain) {
      throw new createEntityException('Unique domain of the ontology should be set before creating any entities.');
    }
    var URI = Utils.createURI(name, this.domain, 'entity');
    if (this.occupiedURIs.indexOf(URI) != -1) {
      throw new createEntityException('An entity with the same name already exists.');
    } else {
      this.occupiedURIs.push(URI);
      var entity = new Entity(name);
      entity.ontology = this;
      this.entityCollection[name] = entity;
      if (SEMANTICS.debug) {
        console.log('Entity \'' + name + '\' created.');
      }
      return entity;
    }
  };
  return createEntity;
}();
CORE_Ontology_Ontology = function () {
  function Ontology(name, domain) {
    this.type = 'ontology';
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
  var createOntology = function (name, domain) {
    var Ontology = CORE_Ontology_Ontology;
    var Utils = CORE_Utils_Utils;
    var createOntologyException = CORE_Exception_createOntologyException;
    if (typeof name !== 'string') {
      throw new createOntologyException('Name argument of \'createOntology\' must be of type \'String\'.');
    }
    if (typeof domain !== 'string') {
      throw new createOntologyException('Domain argument of \'createOntology\' must be of type \'String\'.');
    }
    if (!name || name && name.length === 0) {
      throw new createOntologyException('Name argument not present or blank.');
    }
    if (!domain || domain && domain.length === 0) {
      throw new createOntologyException('Domain argument not present or blank.');
    }
    domain = Utils.stripDomain(domain);
    if (this.occupiedDomains.indexOf(domain) != -1) {
      throw new createOntologyException('An ontology with the same domain already exists.');
    } else {
      this.occupiedDomains.push(domain);
      var ontology = new Ontology(name, domain);
      var URI = Utils.createURI(name, domain, 'ontology');
      this.ontologies[URI] = ontology;
      if (SEMANTICS.debug) {
        console.log('Ontology \'' + name + '\' created.');
      }
      return ontology;
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