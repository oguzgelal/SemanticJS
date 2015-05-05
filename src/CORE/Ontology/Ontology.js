/**
General ontology that will contain all the entities, relationships and literals.

@class CORE.Ontology
@constructor
@param {String} name Name of the Ontology.
@param {String} domain Domain of the Ontology.
*/

define(function(){

	function Ontology(name, domain){
		/**
		For identifying an instance
		@property type
		@type String
		*/
		this.type = "ontology";
		/**
		Name of the ontology
		@property name
		@type String
		*/
		this.name = name;
		/**
		URI of the ontology
		@property URI
		@type String
		*/
		this.URI = null;
		/**
		Domain of the ontology where all the URI's will be based on
		@property domain
		@type String
		@default undefined
		*/
		this.domain = domain;
		/**
		@property entityCollection
		@type Object {Entity name, Entity}
		@default {}
		*/
		this.entityCollection = {};
		/**
		Keeps every URI created under this ontology. Will be used for uniqueness check.
		@property occupiedURIs
		@type String Array
		@default []
		*/
		this.occupiedURIs = [];
		
	}

	Ontology.prototype.createEntity = require('CORE/Entity/createEntity');
	Ontology.prototype.createRelation = require('CORE/Relation/createRelation');
	Ontology.prototype.createLiteral = require('CORE/Literal/createLiteral');

	return Ontology;
});