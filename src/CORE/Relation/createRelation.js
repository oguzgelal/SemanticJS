/**
Adds a relation from an entity to another entity or literal.

@method createRelation
@for CORE.Ontology
@throws {createRelationException} Cannot create relation.
@param {String} relation The object of relation to be added.
@return {Relation} Returns the created Relation object.
@example
	var semantics = new Semant();
	var geo = semantics.createOntology("Geo", "http://geo.com");
	var in = geo.createRelation("in");
	*/

	define(function(){

		var createRelation = function(name){
			var Relation = require('CORE/Relation/Relation');
			var Utils = require('CORE/Utils/Utils');

			var createRelationException = require('CORE/Exception/createRelationException');

			// The name should be string
			if (typeof name !== 'string'){ throw new createRelationException("Argument of 'createRelation' must be of type 'String' and indicate the name of the relation."); }
			// Cannot be blank
			if (!name || (name && name.length === 0)){ throw new createRelationException("Argument of 'createRelation' is blank or empty."); }
			// Unique name should be created for the Ontology object.
			if (!this.name){ throw new createRelationException("Unique name of the ontology should be set before creating any entities."); }
			// Unique domain should be created for the Ontology object.
			if (!this.domain){ throw new createRelationException("Unique domain of the ontology should be set before creating any entities."); }
			
			var URI = Utils.createURI(name, this.domain, 'relation');
			if (this.occupiedURIs.indexOf(URI)!=-1){
				throw new createRelationException("A relation with the same name already exists.");
			}
			else{
				this.occupiedURIs.push(URI);
				var relation = new Relation(name);
				relation.ontology = this;
				relation.URI = URI;
				if (SEMANTICS.debug){ console.log("Relation '"+name+"' created."); }
				return relation;
			}
			
		};

		return createRelation;
	});