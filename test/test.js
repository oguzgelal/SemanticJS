$(document).ready(function(){

	var semantics = new Semant();
	semantics.setDebug(true); // already defaults to true

	var ont_alive = semantics.createOntology("Alive", "ppl.com");
	var ent_human = ont_alive.createEntity("Human");
	var ent_animal = ont_alive.createEntity("Animal");

	//human
	var ent_male = ent_human.createSubEntity("Male");
	var ent_female = ent_human.createSubEntity("Female");

	// animal
	var ent_dog = ont_alive.createEntity("Dog");
	var ent_cat = ont_alive.createEntity("Cat");
	ent_dog.makeSubEntity(ent_animal);
	ent_cat.makeSubEntity(ent_animal);


	console.log("---------------------- Alive");
	console.log(ont_alive);
	console.log("---------------------- Human");
	console.log(ent_human);
	console.log("---------------------- Male");
	console.log(ent_male);
	console.log("---------------------- Animal");
	console.log(ent_animal);
	console.log("---------------------- Dog");
	console.log(ent_dog);
	console.log("---------------------- Semantics");
	console.log(semantics);

});