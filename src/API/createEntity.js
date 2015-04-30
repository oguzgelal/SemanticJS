/**
* Creates an entity object and attaches it to semant object.
*
* @method createEntity
* @param {String} Name of the Entity.
* @return {Object} Returns the created entity object.
*/

define(function(){

	var Entity = require('CORE/Entity/Entity');
	var createEntityException = require('CORE/Exceptions/createEntityException');

	var createEntity = function(name){
		if (typeof name === 'string'){
			var entity = new Entity(name);
			this.entityCollection.push();
			if (this.debug){ console.log("Entity '"+name+"' created."); }
			return entity;
		}
		else{ throw new createEntityException("Argument of 'createEntity' must be of type 'String' and indicate the name of the entity."); }
	};

	return createEntity;
});