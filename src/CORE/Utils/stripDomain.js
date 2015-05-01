/**
Converts the domain into the desired form

@method stripDomain
@for CORE.Utils
@param {String} domain Domain to be converted.
*/

define(function(){

	var stripDomain = function(domain){
			// strip slashes
			if (domain.substring(domain.length-1, domain.length) === '/'){ domain = domain.substring(0, domain.length-1); }
			// if domain prefix not present, add http:// 
			if (!domain.match(/(\w)*:\/\//gi)){ domain = "http://"+domain; }
			return domain;
		};

		return stripDomain;
	});