/**
Creates an entity. Called from the Ontology object.

@method exportOWL
@for CORE.Export
@throws {exportOWLException} Exportation failed
@param {Object} ontology The ontology object
@param {Object} options Rules of exportation in key / value pairs
@return {String} Returns the contents of the OWL file output
*/

define(function(){
	
	function plugRelation(relation, options){
		var plug = "";
		plug+="<!-- "+relation.URI+" -->";
		plug+="<owl:ObjectProperty rdf:about='"+relation.URI+"'>";
		// add domain data
		if (relation.domains.length > 0){
			plug+="<rdfs:domain>";
			plug+="<owl:Class>";
			for(var i=0; i<relation.domains.length; i++){
				
			}
			plug+="</owl:Class>";
			plug+="</rdfs:domain>";
		}
		plug+="</owl:ObjectProperty>";
	}

	function exportOWL(ontology, options){
		var output = "";

	}

	return exportOWL;
});