/**
Ontology cannot be exported into OWL format

@class CORE.Exception.exportOWLException
@constructor
@param {String} message Information on why the export cannot be completed.
@extends CORE.Exception
*/

define(function(){
	
	var Exception = require('CORE/Exception/Exception');

	function exportOWLException(message){
		this.code = 5;
		this.name = "OWL export failed";
		this.notice = "Ontology cannot be exported into OWL format";
		this.message = message;
		if (SEMANTICS.debug){ console.log(this.details()); }
	}
	// subclass.prototype = new baseclass();
	exportOWLException.prototype = new Exception();

	return exportOWLException;
});