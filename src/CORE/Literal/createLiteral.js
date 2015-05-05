/**
Creates a literal

@method createLiteral
@for CORE.Ontology
@throws {createLiteralException} Cannot create literal.
@param {Object} value The object of relation to be added.
@return {Literal} Returns the created Relation object.
@example
	var ppl = semantics.createOntology("People", "http://ppl.com");
	var male = ppl.createEntity("Male");
	var female = ppl.createEntity("Female");
	var bornIn = ppl.createRelation("bornIn");
	var oguz = male.createSubEntity("Oguz");
	var oguzYear = ppl.createLiteral(1993);
	oguz.addRelation(bornIn, oguzYear);
	*/

	define(function(){

		var createLiteral = function(value){

			var Literal = require('CORE/Literal/Literal');
			var Utils = require('CORE/Utils/Utils');
			var createLiteralException = require('CORE/Exception/createLiteralException');

			// Cannot be blank
			if (value===null || value===undefined){ throw new createLiteralException("Argument of 'createLiteral' is blank or empty."); }
			// Unique name should be created for the Ontology object.
			if (!this.name){ throw new createLiteralException("Unique name of the ontology should be set before creating any literals."); }
			// Unique domain should be created for the Ontology object.
			if (!this.domain){ throw new createLiteralException("Unique domain of the ontology should be set before creating any literals."); }
			
			// Create a literal with an absolute unique ID with dynamic lenght
			var randomLength = 3;
			var randomID = Utils.randomString(randomLength);
			var URI = Utils.createURI(randomID, this.domain, 'literal');
			var tryCount = 0;
			var tryCountLimit = 20;
			while(this.occupiedURIs.indexOf(URI)!=-1){
				randomID = Utils.randomString(randomLength);
				URI = Utils.createURI(randomID, this.domain, 'literal');
				tryCount++;
				if (tryCount>=tryCountLimit){
					randomLength++;
					tryCount=0;
				}
			}
			
			this.occupiedURIs.push(URI);
			var literal = new Literal(value);
			literal.ontology = this;
			literal.URI = URI;
			if (SEMANTICS.debug){ console.log("Literal '"+value.toString()+"' created ("+URI+")."); }
			return literal;
		};

		return createLiteral;
	});