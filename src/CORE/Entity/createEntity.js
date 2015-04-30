/**
Creates an entity object and attaches it to semant object.

@method createEntity
@for CORE.Ontology
@throws {createEntityException} Cannot create entity.
@param {String} name Name of the Entity.
@return {Entity} Returns the created Entity object.
@example
	var semantics = new Semant();
	var people = semantics.createOntology("People", "http://ppl.com");
	var male = ont_people.createEntity("Male");
	var female = ont_people.createEntity("Femal");;
	*/

	define(function(){

		var Entity = require('CORE/Entity/Entity');
		var createEntityException = require('CORE/Exception/createEntityException');

		var createEntity = function(name){
			// The name should be string
			if (typeof name !== 'string'){ throw new createEntityException("Argument of 'createEntity' must be of type 'String' and indicate the name of the entity."); }
			// Unique name should be created for the Semant object.
			else if (!this.name){ throw new createEntityException("Unique name of the ontology should be set before creating any entities."); }
			// Unique domain should be created for the Semant object.
			else if (!this.domain){ throw new createEntityException("Unique domain of the ontology should be set before creating any entities."); }
			else{
				var URI = this.domain+"#"+name;
				if (this.occupiedURIs.indexOf(URI)!=-1){
					throw new createEntityException("An entity with the same name already exists.");
				}
				else{
					this.occupiedURIs.push(URI);
					var entity = new Entity(name);
					this.entityCollection[name] = entity;
					if (this.debug){ console.log("Entity '"+name+"' created."); }
					return entity;
				}
			}
		};

		return createEntity;
	});