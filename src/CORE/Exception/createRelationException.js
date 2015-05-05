/**
Relation cannot be created exception

@class CORE.Exception.createRelationException
@constructor
@param {String} message Information on why the relation could not be created.
@extends CORE.Exception
*/

define(function(){
	
	var Exception = require('CORE/Exception/Exception');

	function createRelationException(message){
		this.code = 4;
		this.name = "Create relation failed";
		this.notice = "Relation cannot be created";
		this.message = message;
		if (SEMANTICS.debug){ console.log(this.details()); }
	}
	// subclass.prototype = new baseclass();
	createRelationException.prototype = new Exception();

	return createRelationException;
});