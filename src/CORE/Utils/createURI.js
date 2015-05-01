/**
Generates URI for objects.

@method createURI
@for CORE.Utils
@param {String} name Name of the item which the URI will be created.
@param {String} domain Under what domain the URI will be created
@param {String} path The type of item.
@example
	console.log(createURI("People", "http://abc.com", "ontology")); //will output - http://abc.com/ontology/People
	*/

	define(function(){

		var createURI = function(name, domain, path){
			var createURIException = require('CORE/Exception/createURIException');
			
			// type checks
			if (typeof name !== "string"){ throw new createURIException("The name parameter should be of type string."); }
			if (typeof domain !== "string"){ throw new createURIException("The domain parameter should be of type string."); }
			if (typeof path !== "string"){ throw new createURIException("The path parameter should be of type string."); }
			if (!name || (name && name.length === 0)){ throw new createURIException("Name parameter not present or empty."); }
			if (!domain || (domain && domain.length === 0)){ throw new createURIException("Domain parameter not present or empty."); }
			if (!path || (path && path.length === 0)){ throw new createURIException("Path parameter not present or empty."); }
			// strip slashes
			if (domain.substring(domain.length-1, domain.length) === '/'){ domain = domain.substring(0, domain.length-1); }
			if (path.substring(path.length-1, path.length) === '/'){ path = path.substring(0, path.length-1); }
			if (path.substring(0, 1) === '/'){  path = path.substring(1, path.length); }
			// if domain prefix not present, add http:// 
			if (!domain.match(/(\w)*:\/\//gi)){ domain = "http://"+domain; }
			return domain+"/"+path+"/"+name;
		};

		return createURI;
	});