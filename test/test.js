$(document).ready(function(){

	var semantics = new Semant();
	var geo = semantics.createOntology("Geo", "http://geo.com");
	var inloc = geo.createRelation("in");
	var turkey = geo.createEntity("Turkey");
	var istanbul = geo.createEntity("Istanbul");
	var izmir = geo.createEntity("Izmir");
	istanbul.addRelation(inloc, turkey);
	izmir.addRelation(inloc, turkey);

	console.log(inloc);
	console.log(geo);

	console.log(istanbul);
	console.log(turkey);	

});