var inquirer = require("inquirer");
var gl = 10;
var movie = ['aliens', 'jaws','taken','thor','rocky', 'shrek', 'inception', 'avatar',
'predator', 'titanic', 'scarface'];
var Word = require("./word.js");
var letsArr = [];
var mov;
var movJoin;
var movShow;
var corrflag = false;

restart();
start();
guess();

function start (){

console.log("Movie Name: ");
console.log(movJoin);
}

function restart (){

 letsArr = [];
 gl = 10;
 mov = new Word (randy());
 movShow = mov.show();
 movJoin = movShow.join(" ");
}

function randy (){

	return movie[Math.floor(Math.random() * movie.length)];
}

function agains(){
inquirer.prompt([
{
 	  type: "confirm",
      message: "Play again?",
      name: "conf",
      default: true

    }
	]).then(function(again) {

		if(again.conf){

			restart();
			start();
			guess();
			return false;
		}

		else{

			console.log("BYE!");
			return false;
		}

	})

}

			function answer(){

			for (var i = 0; i < mov.movie.length; i++) {
	
			if (mov.movie[i] !== movShow[i]){
				return false;
			}
		}
			return true;
}

	function correct(){

	movJoin = movShow.join(" ");
	console.log("CORRECT!");
	console.log(movJoin);
	guess();

}
	
function wrong(){

console.log("INCORRECT!");
	
	gl = gl -1;

	if (gl === 0){

		console.log("YOU LOST!");
		console.log("The movie was " + mov.movie);
		restart();
		agains();
		return false;
}

	else{

	console.log("Guesses Left: " + gl);
	console.log("Letters Guessed " + letsArr.join(" "));
	console.log(movJoin);
	guess();
	}
}

function guess (){

inquirer.prompt([
{
 		name: "let",
        message: "Guess a letter:",
        validate: function(lets) {
	        if (lets.length ===1 && letsArr.indexOf(lets.toLowerCase()) === -1 && isNaN(lets)) {
	          return true;
	        }
	          return false;
	      },		      

    }
	]).then(function(guess1) {

			corrflag = false;
	for (var i = 0; i < mov.movie.length; i++) {

		if (guess1.let.toLowerCase() === mov.movie.charAt([i])){
		corrflag = true;
		movShow[i] = mov.movie[i];
		letsArr.push(guess1.let.toLowerCase());

			if (answer()){

	console.log("You won!!");
	console.log("the movie was: " + mov.movie);
	restart();
	agains();
	return false;	
	}
		
	}

}	
	if (corrflag === true) {
	correct();
	return false;
	}

	letsArr.push(guess1.let.toLowerCase());
	wrong();
	})
}