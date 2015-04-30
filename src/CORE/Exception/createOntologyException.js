/**
Ontology cannot be created exception

@class CORE.Exception.createOntologyException
@constructor
@param {String} message Information on why the ontology could not be created.
@extends CORE.Exception
*/

define(function(){
	
	var Exception = require('CORE/Exception/Exception');

	function createOntologyException(message){
		this.code = 1;
		this.name = "Create ontology failed";
		this.notice = "Ontology cannot be created";
		this.message = message;
		if (SEMANTICS.debug){ console.log(this.details()); }
	}
	// subclass.prototype = new baseclass();
	createOntologyException.prototype = new Exception();

	return createOntologyException;
});