/**
Exception base class of SemantJS.

@class CORE.Exception
@constructor
*/

define(function(){

	function Exception(){
		/**
		@property code
		@type Integer
		@default undefined
		*/
		this.code = undefined;
		/**
		@property name
		@type String
		@default undefined
		*/
		this.name = undefined;
		/**
		@property notice
		@type String
		@default undefined
		*/
		this.notice = undefined;
		/**
		@property message
		@type String
		@default undefined
		*/
		this.message = undefined;
	}

	/**
	@method toString
	@return {String} Gives a basic description of the exception.
	*/
	Exception.prototype.toString = function(){
		return this.name+" ("+this.code+") : "+this.notice;
	};
	/**
	@method details
	@return {String} Gives a detailed description of the exception.
	*/
	Exception.prototype.details = function(){
		return this.name+" ("+this.code+") : "+this.message;
	};

	return Exception;
});