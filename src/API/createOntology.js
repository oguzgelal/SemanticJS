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

		var Ontology = require('CORE/Ontology/Ontology');
		var createOntologyException = require('CORE/Exception/createOntologyException');

		var createOntology = function(name, domain){
			// The name should be string
			if (typeof name !== 'string'){ throw new createOntologyException("Name argument of 'createOntology' must be of type 'String'."); }
			// The name should be string
			else if (typeof domain !== 'string'){ throw new createOntologyException("Domain argument of 'createOntology' must be of type 'String'."); }
			else{
				// TODO : strip 'http', '/' etc. from the domain
				if (this.occupiedDomains.indexOf(domain)!=-1){
					throw new createOntologyException("An ontology with the same domain already exists.");
				}
				else{
					this.occupiedDomains.push(domain);
					var ontology = new Ontology(name, domain);
					var URI = domain+"/ontology/"+name;
					this.ontologies[URI] = ontology;
					if (this.debug){ console.log("Ontology '"+name+"' created."); }
					return ontology;
				}
			}
		};

		return createOntology;
	});