/**
Literal cannot be created exception

@class CORE.Exception.createLiteralException
@constructor
@param {String} message Information on why the literal could not be created.
@extends CORE.Exception
*/

define(function(){
	
	var Exception = require('CORE/Exception/Exception');

	function createLiteralException(message){
		this.code = 4;
		this.name = "Create literal failed";
		this.notice = "Literal cannot be created";
		this.message = message;
		if (SEMANTICS.debug){ console.log(this.details()); }
	}
	// subclass.prototype = new baseclass();
	createLiteralException.prototype = new Exception();

	return createLiteralException;
});