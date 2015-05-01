/**
URI cannot be generated

@class CORE.Exception.createURIException
@constructor
@param {String} message Information on why the URI could not be generated.
@extends CORE.Exception
*/

define(function(){
	
	var Exception = require('CORE/Exception/Exception');

	function createURIException(message){
		this.code = 2;
		this.name = "URI generation failed";
		this.notice = "URI cannot be created.";
		this.message = message;
		if (SEMANTICS.debug){ console.log(this.details()); }
	}
	// subclass.prototype = new baseclass();
	createURIException.prototype = new Exception();

	return createURIException;
});