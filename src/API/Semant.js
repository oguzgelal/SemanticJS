define(function(){

	function Semant(){
		this.name = undefined;
		this.URI = undefined;
		this.debug = false;
		this.entityCollection = [];
	}
	
	Semant.prototype.createEntity = require('API/createEntity');

	return Semant;
});