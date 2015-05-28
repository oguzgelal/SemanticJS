;(function(window, document, navigator, undefined) {
var SEMANTICS={debug:true};
var CORE_Exception_Exception, CORE_Exception_createURIException, CORE_Utils_createURI, CORE_Utils_stripDomain, CORE_Utils_randomString, CORE_Utils_Utils, CORE_Exception_createEntityException, CORE_Entity_createSubEntity, CORE_Exception_makeSubEntityException, CORE_Entity_makeSubEntity, CORE_Exception_addRelationException, CORE_Relation_addRelation, CORE_Entity_Entity, CORE_Entity_createEntity, CORE_Relation_Relation, CORE_Exception_createRelationException, CORE_Relation_createRelation, CORE_Literal_Literal, CORE_Exception_createLiteralException, CORE_Literal_createLiteral, CORE_Ontology_Ontology, CORE_Exception_createOntologyException, CORE_Ontology_createOntology, API_Semant;
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
    this.code = 2;
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
CORE_Utils_randomString = function () {
  var randomString = function (n) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < n; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  return randomString;
}();
CORE_Utils_Utils = function () {
  var Utils = {
    createURI: CORE_Utils_createURI,
    stripDomain: CORE_Utils_stripDomain,
    randomString: CORE_Utils_randomString
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
      entity.URI = URI;
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
CORE_Exception_makeSubEntityException = function () {
  var Exception = CORE_Exception_Exception;
  function makeSubEntityException(message) {
    this.code = 3;
    this.name = 'Make sub entity failed';
    this.notice = 'Sub entity making failed.';
    this.message = message;
    if (SEMANTICS.debug) {
      console.log(this.details());
    }
  }
  makeSubEntityException.prototype = new Exception();
  return makeSubEntityException;
}();
CORE_Entity_makeSubEntity = function () {
  var makeSubEntity = function (parentEntity) {
    var makeSubEntityException = CORE_Exception_makeSubEntityException;
    if (typeof parentEntity !== 'object' || !parentEntity.type || parentEntity.type !== 'entity') {
      throw new makeSubEntityException('The argument of makeSubEntity must be entity object.');
    }
    if (this.parent !== null) {
      throw new makeSubEntityException('\'' + this.name + '\' Entity already has a parent');
    }
    parentEntity.subs[this.name] = this;
    this.parent = parentEntity;
    if (SEMANTICS.debug) {
      console.log('Entity \'' + this.name + '\' is now a sub-entity of \'' + parentEntity.name + '\'.');
    }
  };
  return makeSubEntity;
}();
CORE_Exception_addRelationException = function () {
  var Exception = CORE_Exception_Exception;
  function addRelationException(message) {
    this.code = 5;
    this.name = 'Add relation failed';
    this.notice = 'Relation cannot be added';
    this.message = message;
    if (SEMANTICS.debug) {
      console.log(this.details());
    }
  }
  addRelationException.prototype = new Exception();
  return addRelationException;
}();
CORE_Relation_addRelation = function () {
  var addRelation = function (relation, target) {
    var createEntityException = CORE_Exception_createEntityException;
    var addRelationException = CORE_Exception_addRelationException;
    if (typeof relation !== 'object' || !relation.type || relation.type !== 'relation') {
      throw new addRelationException('The first argument of addRelation must be a relation object.');
    }
    if (typeof target !== 'object' || !target.type || target.type !== 'entity' && target.type !== 'literal') {
      throw new addRelationException('The second argument of addRelation must be a entity or literal object.');
    }
    relation.domains[this.name] = this;
    relation.ranges[target.name] = target;
    this.relOut.push([
      relation,
      target
    ]);
    if (target.type === 'entity') {
      target.relIn.push([
        relation,
        this
      ]);
    }
  };
  return addRelation;
}();
CORE_Entity_Entity = function () {
  function Entity(name) {
    this.type = 'entity';
    this.name = name;
    this.URI = null;
    this.relOut = [];
    this.relIn = [];
    this.individuals = {};
    this.subs = {};
    this.parent = null;
    this.ontology = null;
  }
  Entity.prototype.createSubEntity = CORE_Entity_createSubEntity;
  Entity.prototype.makeSubEntity = CORE_Entity_makeSubEntity;
  Entity.prototype.addRelation = CORE_Relation_addRelation;
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
      entity.URI = URI;
      this.entityCollection[name] = entity;
      if (SEMANTICS.debug) {
        console.log('Entity \'' + name + '\' created.');
      }
      return entity;
    }
  };
  return createEntity;
}();
CORE_Relation_Relation = function () {
  function Relation(name) {
    this.type = 'relation';
    this.name = name;
    this.URI = null;
    this.ontology = null;
    this.domains = {};
    this.ranges = {};
  }
  return Relation;
}();
CORE_Exception_createRelationException = function () {
  var Exception = CORE_Exception_Exception;
  function createRelationException(message) {
    this.code = 4;
    this.name = 'Create relation failed';
    this.notice = 'Relation cannot be created';
    this.message = message;
    if (SEMANTICS.debug) {
      console.log(this.details());
    }
  }
  createRelationException.prototype = new Exception();
  return createRelationException;
}();
CORE_Relation_createRelation = function () {
  var createRelation = function (name) {
    var Relation = CORE_Relation_Relation;
    var Utils = CORE_Utils_Utils;
    var createRelationException = CORE_Exception_createRelationException;
    if (typeof name !== 'string') {
      throw new createRelationException('Argument of \'createRelation\' must be of type \'String\' and indicate the name of the relation.');
    }
    if (!name || name && name.length === 0) {
      throw new createRelationException('Argument of \'createRelation\' is blank or empty.');
    }
    if (!this.name) {
      throw new createRelationException('Unique name of the ontology should be set before creating any relations.');
    }
    if (!this.domain) {
      throw new createRelationException('Unique domain of the ontology should be set before creating any relations.');
    }
    var URI = Utils.createURI(name, this.domain, 'relation');
    if (this.occupiedURIs.indexOf(URI) != -1) {
      throw new createRelationException('A relation with the same name already exists.');
    } else {
      this.occupiedURIs.push(URI);
      var relation = new Relation(name);
      relation.ontology = this;
      relation.URI = URI;
      this.relationCollection[name] = relation;
      if (SEMANTICS.debug) {
        console.log('Relation \'' + name + '\' created.');
      }
      return relation;
    }
  };
  return createRelation;
}();
CORE_Literal_Literal = function () {
  function Literal(value) {
    this.type = 'literal';
    this.literaltype = typeof value;
    this.URI = null;
    this.value = value;
    this.ontology = null;
  }
  return Literal;
}();
CORE_Exception_createLiteralException = function () {
  var Exception = CORE_Exception_Exception;
  function createLiteralException(message) {
    this.code = 4;
    this.name = 'Create literal failed';
    this.notice = 'Literal cannot be created';
    this.message = message;
    if (SEMANTICS.debug) {
      console.log(this.details());
    }
  }
  createLiteralException.prototype = new Exception();
  return createLiteralException;
}();
CORE_Literal_createLiteral = function () {
  var createLiteral = function (value) {
    var Literal = CORE_Literal_Literal;
    var Utils = CORE_Utils_Utils;
    var createLiteralException = CORE_Exception_createLiteralException;
    if (value === null || value === undefined) {
      throw new createLiteralException('Argument of \'createLiteral\' is blank or empty.');
    }
    if (!this.name) {
      throw new createLiteralException('Unique name of the ontology should be set before creating any literals.');
    }
    if (!this.domain) {
      throw new createLiteralException('Unique domain of the ontology should be set before creating any literals.');
    }
    var randomLength = 3;
    var randomID = Utils.randomString(randomLength);
    var URI = Utils.createURI(randomID, this.domain, 'literal');
    var tryCount = 0;
    var tryCountLimit = 20;
    while (this.occupiedURIs.indexOf(URI) != -1) {
      randomID = Utils.randomString(randomLength);
      URI = Utils.createURI(randomID, this.domain, 'literal');
      tryCount++;
      if (tryCount >= tryCountLimit) {
        randomLength++;
        tryCount = 0;
      }
    }
    this.occupiedURIs.push(URI);
    var literal = new Literal(value);
    literal.ontology = this;
    literal.URI = URI;
    if (SEMANTICS.debug) {
      console.log('Literal \'' + value.toString() + '\' created (' + URI + ').');
    }
    return literal;
  };
  return createLiteral;
}();
CORE_Ontology_Ontology = function () {
  function Ontology(name, domain) {
    this.type = 'ontology';
    this.name = name;
    this.URI = null;
    this.domain = domain;
    this.entityCollection = {};
    this.relationCollection = {};
    this.occupiedURIs = [];
  }
  Ontology.prototype.createEntity = CORE_Entity_createEntity;
  Ontology.prototype.createRelation = CORE_Relation_createRelation;
  Ontology.prototype.createLiteral = CORE_Literal_createLiteral;
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
      ontology.URI = URI;
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