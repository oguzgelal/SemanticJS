/**
@class CORE.Entity
@constructor
@param {String} name Name of the entity
*/

define(function(){
	
	function Entity(name) {
		/**
		For identifying an instance
		@property type
		@type String
		*/
		this.type = "entity";
		/**
		Name of the entity
		@property name
		@type String
		*/
		this.name = name;
		/**
		The relationships where this entity is the domain. What this variable
		stores is {relationship, entity} or {relationship, literal}. For example
		in a relationship like Istanbul -in-> Turkey, the Istanbul entity would
		store this this relationship in relOut as {in, Turkey}

		@property relOut
		@type Object
		@default {}
		*/
		this.relOut = {};
		/**
		The relationships where this entity is the range. What this variable
		stores is {relationship, entity}. For example
		in a relationship like Istanbul -in-> Turkey, the instance Turkey would
		store this this relationship in relIn as {in, Istanbul}

		@property relIn
		@type Object
		@default {}
		*/
		this.relIn = {};
		/**
		Individuals of this entity
		@property individuals
		@type Object
		*/
		this.individuals = {};
		/**
		Sub entities.
		@property subs
		@type Object
		*/
		this.subs = {};
		/**
		Parent entity.
		@property parent
		@type Object
		*/
		this.parent = null;
		/**
		The ontology this entity is created under
		@property ontology
		@type Object
		*/
		this.ontology = null;
	}
	Entity.prototype.createSubEntity = require('CORE/Entity/createSubEntity');
	Entity.prototype.makeSubEntity = require('CORE/Entity/makeSubEntity');

	return Entity;
});