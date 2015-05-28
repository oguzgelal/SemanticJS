$(document).ready(function(){

	var semantics = new Semant();
	
	var geo = semantics.createOntology("Geo", "http://geo.com");
	var inloc = geo.createRelation("in");
	var turkey = geo.createEntity("Turkey");
	var istanbul = geo.createEntity("Istanbul");
	var izmir = geo.createEntity("Izmir");
	istanbul.addRelation(inloc, turkey);
	izmir.addRelation(inloc, turkey);

	var ppl = semantics.createOntology("People", "http://ppl.com");
	var male = ppl.createEntity("Male");
	var female = ppl.createEntity("Female");
	var bornIn = ppl.createRelation("bornIn");
	var oguz = male.createSubEntity("Oguz");
	var oguzDate = ppl.createLiteral(1993);
	oguz.addRelation(bornIn, oguzDate);

	console.log(geo);
	console.log(ppl);
	var owlout = semantics.Export.exportOWL(ppl, {});
	console.log(owlout);
	//semantics.Export.exportOWL(ppl, {});


});