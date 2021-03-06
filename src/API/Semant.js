/**
Base class of the API.

@class API.Semant
@static
*/

define(function(){

	function Semant(){
		/**
		List of created ontologies
		@property ontologies
		@type Object
		@default {}
		*/
		this.ontologies = {};
		/**
		List of occupaid domains
		@property occupiedDomains
		@type Array
		@default []
		*/
		this.occupiedDomains = [];
	}

	Semant.prototype.createOntology = require("CORE/Ontology/createOntology");
	
	/**
	Export object
	@property Export
	@type Object
	@default Export Obj
	*/
	Semant.prototype.Export = require("CORE/Export/Export");

	/**
	Change debug mode
	@method setDebug
	@param {Boolean} debug Set global debug value to this.
	@example
		semantics.setDebug(true);
		*/
		Semant.prototype.setDebug = function(debug){
			if (typeof debug === "boolean"){ SEMANTICS.debug = debug; }
		};
	/**
	Get debug mode
	@method getDebug
	@return {Boolean} Global debug value;
	@example
		semantics.getDebug();
		*/
		Semant.prototype.getDebug = function(){ return SEMANTICS.debug; };
	/**
	Get version
	@method getVersion
	@return {String} Version number;
	@example
		semantics.getVersion();
		*/
		Semant.prototype.getVersion = function(){ return SEMANTICS.version; };


		return Semant;
	});