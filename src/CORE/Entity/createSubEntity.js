/**
Creates an entity. Called from another entity object.

@method createSubEntity
@for CORE.Entity
@throws {createEntityException} Cannot create entity.
@param {String} name Name of the Entity.
@return {Entity} Returns the created Entity object.
@example
	var semantics = new Semant();
	var people = semantics.createOntology("People", "http://ppl.com");
	var male = ont_people.createEntity("Male");
	var female = ont_people.createEntity("Femal");
	*/

	define(function(){

		var createSubEntity = function(name){
			var Entity = require('CORE/Entity/Entity');
			var Utils = require('CORE/Utils/Utils');
			var createEntityException = require('CORE/Exception/createEntityException');

			// The name should be string
			if (typeof name !== 'string'){ throw new createEntityException("Argument of 'createEntity' must be of type 'String' and indicate the name of the entity."); }
			// Cannot be blank
			if (!name || (name && name.length === 0)){ throw new createEntityException("Argument of 'createEntity' is blank or empty."); }
			
			var URI = Utils.createURI(name, this.ontology.domain, 'entity');
			if (this.ontology.occupiedURIs.indexOf(URI)!=-1){
				throw new createEntityException("An entity with the same name already exists.");
			}
			else{
				this.ontology.occupiedURIs.push(URI);

				var entity = new Entity(name);
				// set the parent of the sub entity to current entity.
				entity.parent = this;
				// pass the context of the current entity to the sub entity being created.
				entity.ontology = this.ontology;
				// add the sub entity to the subs list of the current entity.
				this.subs[name] = entity;
				this.ontology.entityCollection[name] = entity;
				if (SEMANTICS.debug){ console.log("Entity '"+name+"' created under the entity '"+this.name+"'."); }
				return entity;
			}
			
		};

		return createSubEntity;
	});