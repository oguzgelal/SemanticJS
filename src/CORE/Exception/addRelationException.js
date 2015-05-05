/**
Relation cannot be added exception

@class CORE.Exception.addRelationException
@constructor
@param {String} message Information on why the relation could not be added.
@extends CORE.Exception
*/

define(function(){
	
	var Exception = require('CORE/Exception/Exception');

	function addRelationException(message){
		this.code = 5;
		this.name = "Add relation failed";
		this.notice = "Relation cannot be added";
		this.message = message;
		if (SEMANTICS.debug){ console.log(this.details()); }
	}
	// subclass.prototype = new baseclass();
	addRelationException.prototype = new Exception();

	return addRelationException;
});