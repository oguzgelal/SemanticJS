/**
Creates a random string

@method randomString
@for CORE.Utils
@param {Integer} n The lenght of the random string to be created
*/

define(function(){

	var randomString = function(n){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for(var i=0; i<n; i++){ text += possible.charAt(Math.floor(Math.random() * possible.length)); }
		return text;
	};

	return randomString;
});