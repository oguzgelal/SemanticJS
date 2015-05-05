/**
Makes an entity a sub entity of another.

@event makeSubEntity
@for CORE.Entity
@throws {makeSubEntityException} Cannot make sub entity.
@param {Object} parentEntity Parent object of this soon-to-be sub entity
@example
	var semantics = new Semant();
	var alive = semantics.createOntology("Alive", "http://alive.com");
	var people = ont_people.createEntity("People");
	var male = ont_people.createEntity("Male");
	var female = ont_people.createEntity("Femal");
	male.makeSubEntity(people);
	female.makeSubEntity(people);
	// same as doing this:
	// people.createSubEntity("Male");
	// people.createSubEntity("Female");
	*/

	define(function(){

		var makeSubEntity = function(parentEntity){

			var makeSubEntityException = require('CORE/Exception/makeSubEntityException');
			if (typeof parentEntity !== "object" || !parentEntity.type || parentEntity.type !== "entity"){ throw new makeSubEntityException("The argument of makeSubEntity must be entity object."); }
			if (this.parent !== null){ throw new makeSubEntityException("'"+this.name+"' Entity already has a parent"); }
			parentEntity.subs[this.name] = this;
			this.parent = parentEntity;
			if (SEMANTICS.debug){ console.log("Entity '"+this.name+"' is now a sub-entity of '"+parentEntity.name+"'."); }
		};

		return makeSubEntity;
	});