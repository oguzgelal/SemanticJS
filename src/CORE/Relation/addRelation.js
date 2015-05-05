/**
Adds a relation from an entity to another entity or literal.

@event addRelation
@for CORE.Entity
@throws {addRelationException} Cannot add relation.
@param {Object} relation The object of relation to be added.
@param {Object} target The target object. Could be an entity or literal object.
@example
	var semantics = new Semant();
	var geo = semantics.createOntology("Geo", "http://geo.com");
	var in = geo.createRelation("in");
	var turkey = geo.createEntity("Turkey");
	var istanbul = geo.createEntity("Istanbul");
	istanbul.addRelation(in, turkey);
	*/

	define(function(){

		var addRelation = function(relation, target){
			
			var createEntityException = require('CORE/Exception/createEntityException');
			var addRelationException = require('CORE/Exception/addRelationException');

			// type checks
			if (typeof relation !== "object" || !relation.type || relation.type !== "relation"){
				throw new addRelationException("The first argument of addRelation must be a relation object.");
			}
			if (typeof target !== "object" || !target.type || (target.type !== "entity" && target.type !== "literal")){
				throw new addRelationException("The second argument of addRelation must be a entity or literal object.");
			}

			// add the relation to the relout of the source object
			this.relOut.push([relation, target]);

			// add the relation to the relin of the target object if entity
			if (target.type === "entity"){ target.relIn.push([relation, this]); }
			
		};

		return addRelation;
	});