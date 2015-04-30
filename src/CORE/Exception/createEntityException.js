/**
Entity cannot be created exception

@class CORE.Exception.createEntityException
@constructor
@param {String} message Information on why the entity could not be created.
@extends CORE.Exception
*/

define(function(){
	
	var Exception = require('CORE/Exception/Exception');

	function createEntityException(message){
		this.code = 0;
		this.name = "Create entity failed";
		this.notice = "Entity cannot be created";
		this.message = message;
		if (SEMANTICS.debug){ console.log(this.details()); }
	}
	// subclass.prototype = new baseclass();
	createEntityException.prototype = new Exception();

	return createEntityException;
});