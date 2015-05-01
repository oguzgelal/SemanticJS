/**
Make sub entity failed

@class CORE.Exception.makeSubEntityException
@constructor
@param {String} message Information on why the entity could not be created.
@extends CORE.Exception
*/

define(function(){
	
	var Exception = require('CORE/Exception/Exception');

	function makeSubEntityException(message){
		this.code = 3;
		this.name = "Make sub entity failed";
		this.notice = "Sub entity making failed.";
		this.message = message;
		if (SEMANTICS.debug){ console.log(this.details()); }
	}
	// subclass.prototype = new baseclass();
	makeSubEntityException.prototype = new Exception();

	return makeSubEntityException;
});