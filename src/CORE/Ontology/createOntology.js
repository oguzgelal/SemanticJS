/**
Creates an ontology

@method createOntology
@for API.Semant
@throws {createOntologyException} Cannot create ontology.
@param {String} name Name of the ontology.
@param {String} domain Unique domain of the ontology.
@return {Ontology} Returns the created Ontology object.
@example
	var semantics = new Semant();
	var people = semantics.createOntology("People", "http://ppl.com");
	*/

	define(function(){

		var createOntology = function(name, domain){
			var Ontology = require('CORE/Ontology/Ontology');
			var Utils = require('CORE/Utils/Utils');
			var createOntologyException = require('CORE/Exception/createOntologyException');
			
			// The name should be string
			if (typeof name !== 'string'){ throw new createOntologyException("Name argument of 'createOntology' must be of type 'String'."); }
			// The name should be string
			if (typeof domain !== 'string'){ throw new createOntologyException("Domain argument of 'createOntology' must be of type 'String'."); }
			// Cannot be blank
			if (!name || (name && name.length === 0)){ throw new createOntologyException("Name argument not present or blank."); }
			// Cannot be blank
			if (!domain || (domain && domain.length === 0)){ throw new createOntologyException("Domain argument not present or blank."); }
			
			// strip domain
			domain = Utils.stripDomain(domain);

			if (this.occupiedDomains.indexOf(domain)!=-1){
				throw new createOntologyException("An ontology with the same domain already exists.");
			}
			else{
				this.occupiedDomains.push(domain);
				var ontology = new Ontology(name, domain);
				var URI = Utils.createURI(name, domain, 'ontology');
				this.ontologies[URI] = ontology;
				if (SEMANTICS.debug){ console.log("Ontology '"+name+"' created."); }
				return ontology;
			}
			
		};

		return createOntology;
	});