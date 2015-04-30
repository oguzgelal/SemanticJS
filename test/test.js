$(document).ready(function(){

	var semantics = new Semant();
	semantics.setDebug(true); // already defaults to true

	var ont_people = semantics.createOntology("People", "http://ppl.com");
	var male_ent = ont_people.createEntity("Male");
	var female_ent = ont_people.createEntity("Femal");
	console.log(ont_people);
	console.log(male_ent);
	console.log(female_ent);

	console.log("----------------------");

	var ont_animals = semantics.createOntology("Animals", "http://anms.com");
	var cat_ent = ont_animals.createEntity("Cat");
	var dog_ent = ont_animals.createEntity("Dog");
	var bird_ent = ont_animals.createEntity("Bird");
	console.log(ont_animals);
	console.log(cat_ent);
	console.log(dog_ent);
	console.log(bird_ent);

	console.log("----------------------");

	console.log(semantics);

});