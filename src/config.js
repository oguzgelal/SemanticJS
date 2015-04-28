require.config({
	optimize: 'none',
	out: "../dist/semantic.js",
	//name: "almond",
	findNestedDependencies: true,
	preserveLicenseComments: false,
	skipModuleInsertion: true,
	include: ["index"]
});