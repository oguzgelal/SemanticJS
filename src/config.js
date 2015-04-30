require.config({
	optimize: 'none',
	out: "../dist/semantic.js",
	findNestedDependencies: true,
	preserveLicenseComments: false,
	skipModuleInsertion: true,
	include: ["index"]
});

/*

TODO : add URI field to Ontology class (or implement a getURI method)

*/