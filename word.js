var Letters = require("./letter");

function Word (movie){

		this.movie = movie;
		this.show = function(){

			return new Array(movie.length).fill("_");
		}

}

module.exports = Word;

