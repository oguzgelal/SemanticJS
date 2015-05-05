/**
@class CORE.Relation
@constructor
@param {String} name Name of the relation
*/

define(function(){
	
	function Relation(name) {
		/**
		For identifying an instance
		@property type
		@type String
		*/
		this.type = "relation";
		/**
		Name of the entity
		@property name
		@type String
		*/
		this.name = name;
		/**
		URI of the relation
		@property name
		@type String
		*/
		this.URI = null;
		/**
		The ontology this entity is created under
		@property ontology
		@type Object
		*/
		this.ontology = null;
	}

	return Relation;
});