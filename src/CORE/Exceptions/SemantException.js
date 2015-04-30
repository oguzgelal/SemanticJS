define(function(){
	
	function SemantException(){}
	
	SemantException.prototype.toString = function(){
		return this.name+" ("+this.code+") : "+this.notice;
	};
	SemantException.prototype.details = function(){
		return this.name+" ("+this.code+") : "+this.message;
	};

	return SemantException;
});