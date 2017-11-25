var Letters = require("./letter");

function Word (movie){

		this.letsIn = [];
		this.movie = movie;
		this.movSplit = this.movie.split("");
		this.display = function(){
		for (var i = 0; i < this.movSplit.length; i++) {
			
			if (this.movSplit[i] === " ") {

				this.letsIn.push(" ");
			}

			else {

				this.letsIn.push("_");
			}
		}
	}
}

module.exports = Word;

