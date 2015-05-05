/**
Creates an entity. Called from the Ontology object.

@method createEntity
@for CORE.Ontology
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

		var createEntity = function(name){
			var Entity = require('CORE/Entity/Entity');
			var Utils = require('CORE/Utils/Utils');
			var createEntityException = require('CORE/Exception/createEntityException');

			// The name should be string
			if (typeof name !== 'string'){ throw new createEntityException("Argument of 'createEntity' must be of type 'String' and indicate the name of the entity."); }
			// Cannot be blank
			if (!name || (name && name.length === 0)){ throw new createEntityException("Argument of 'createEntity' is blank or empty."); }
			// Unique name should be created for the Ontology object.
			if (!this.name){ throw new createEntityException("Unique name of the ontology should be set before creating any entities."); }
			// Unique domain should be created for the Ontology object.
			if (!this.domain){ throw new createEntityException("Unique domain of the ontology should be set before creating any entities."); }
			
			var URI = Utils.createURI(name, this.domain, 'entity');
			if (this.occupiedURIs.indexOf(URI)!=-1){
				throw new createEntityException("An entity with the same name already exists.");
			}
			else{
				this.occupiedURIs.push(URI);
				var entity = new Entity(name);
				// determine the context ontology of the entity
				entity.ontology = this;
				entity.URI = URI;
				this.entityCollection[name] = entity;
				if (SEMANTICS.debug){ console.log("Entity '"+name+"' created."); }
				return entity;
			}
			
		};

		return createEntity;
	});