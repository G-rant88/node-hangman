var inquirer = require("inquirer");
var gl = 10;
var movie = ['top gun', 'blade runner', 'star wars', 'jurassic park', 'eternal sunshine of the spotless mind', 
'little miss sunshine', 'pulp fiction', 'the wolf of wall street', 'saving private ryan',
'aliens', 'predator', 'avatar', 'inception', 'the dark knight', 'shrek', 'jaws', 'thor'];
var Word = require("./word.js");
var mysql = require('mysql');
var letsArr = [];
var mov;
var corrflag = false;
var namey;
var con = mysql.createConnection({
  host: "localhost",
  user: "Ben",
  password: "bgrant88",
  database: "hangmandb"
  
});

ask();

function ask(){

console.log("\nWelcome to Movie Hangman Node Madness!!!\n");

inquirer
  .prompt([
    {
      type: "confirm",
      message: "Do already have an account?",
      name: "conf",
      default: true
    }
    ])
  .then(function(acc) {

if (acc.conf){

  signin();
}

else {

  create();
}

  });

}

function create(){

	inquirer
  .prompt([
    {
      type: "input",
      message: "Please create a username:",
      name: "user"
    },
    {
      type: "password",
      message: "Plese create a password:",
      name: "pws",
      hidden: true,
      mask: "*"
    }
    ])
  .then(function(sign) {

con.connect(function(err) {
  if (err) throw err;

   var sql = "INSERT INTO data (username, password) VALUES ?";
   values = [

   [sign.user, sign.pws]

   ];

  con.query(sql, [values], function (err, result) {
    if (err) throw err;

  });

  });
  signin();

});

}

function signin(){

inquirer
  .prompt([
    {
      type: "input",
      message: "Please sign in with your username:",
      name: "user2"
    },
    {
      type: "password",
      message: "Please sign in with your password:",
      name: "pws2",
      hidden: true,
      mask: "*"
    }
    ])

.then(function(sign2) {

  con.query("SELECT * FROM data", function (err, result, fields) {
    if (err) throw err;

for (var i = 0; i < result.length; i++) {

     if (sign2.user2 === result[i].username && sign2.pws2 === result[i].password){

  console.log("\nWelcome " + sign2.user2);
      namey = sign2.user2;
      i = result.length;

    restart();
	  start();
	  guess();

       return false;

}

  };

  console.log("Sorry, wrong username/password. Try again:\n");
  signin();
  return false;

  });

});

}

function start (){

console.log("\nMovie Name: \n");
console.log(mov.letsIn.join(" ") + "\n");
}

function restart (){

 letsArr = [];
 gl = 10;
 mov = new Word (randy());
 mov.letsIn = [];
 mov.display();

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

			console.log("\nBYE " + namey + "!!\n" );
			con.end();
			return false;
		}

	})

}

			function answer(){

			for (var i = 0; i < mov.movie.length; i++) {
	
			if (mov.movie[i] !== mov.letsIn[i]){
				return false;
			}
		}
			return true;
}

	function correct(){


	console.log("\nCORRECT!\n");
	console.log(mov.letsIn.join(" ") + "\n");
	guess();
}
	
function wrong(){

console.log("\nINCORRECT!");
	
	gl = gl -1;

	if (gl === 0){

		console.log("\nYOU LOST!");
		console.log("\nThe movie was " + mov.movie + "\n");
		restart();
		agains();
		return false;
}

	else{

	console.log("\nGuesses Left: " + gl + "\n");
	console.log("Letters Guessed " + letsArr.join(" ") + "\n");
	console.log(mov.letsIn.join(" ") + "\n");
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
		mov.letsIn[i] = mov.movie[i];
		

			if (answer()){

	console.log("\nYou won!!\n");
	console.log("the movie was: " + mov.movie + "\n");
	restart();
	agains();
	return false;	
	}
		
	}

}	
	if (corrflag === true) {
  letsArr.push(guess1.let.toLowerCase());
	correct();
	return false;
	}

	letsArr.push(guess1.let.toLowerCase());
	wrong();
	})
}