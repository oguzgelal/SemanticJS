/**
@class CORE.Literal
@constructor
@param {String} value Value of the literal
*/

define(function(){
	
	function Literal(value) {
		/**
		For identifying an instance
		@property type
		@type String
		*/
		this.type = "literal";
		/**
		Literal type ("integer", "string" etc...)
		@property literaltype
		@type String
		*/
		this.literaltype = typeof value;
		/**
		URI of the entity
		@property URI
		@type String
		*/
		this.URI = null;
		/**
		Value of the literal
		@property value
		@type Dynamic
		*/
		this.value = value;
		/**
		The ontology this entity is created under
		@property ontology
		@type Object
		*/
		this.ontology = null;
	}

	return Literal;
});