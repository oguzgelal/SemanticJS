/**
Static class that contains the utilities.

@class CORE.Utils
@static
*/

define(function(){
	
	var Utils = {
		createURI: require('CORE/Utils/createURI'),
		stripDomain: require('CORE/Utils/stripDomain')
	};

	return Utils;
});