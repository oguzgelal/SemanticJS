define(function(){
	
	var SemantException = require('CORE/Exceptions/SemantException');

	function createEntityException(message){
		this.code = 0;
		this.name = "Create entity failed";
		this.notice = "Entity cannot be created";
		this.message = message;
	}
	// subclass.prototype = new baseclass();
	createEntityException.prototype = new SemantException();

	return createEntityException;
});