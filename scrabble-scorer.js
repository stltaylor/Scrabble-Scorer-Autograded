// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowelScoreStructure = ['A','E','I','O','U'];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let answer = input.question('Enter a word to score: ')
    console.log(simpleScorer(answer));
};

let simpleScorer = {
    name: 'Simple Score: ',
    description: 'Each letter is worth 1 point.',
    scoringFunction: function(word) {
        return word.length
    }
}

let vowelBonusScorer = {
    name: 'Bonus Vowels: ',
    description: 'Vowels are 3 points, consonants are 1 point.',
    scoringFunction: function(word){
        let letterPoints = 0;
        for (let i = 0; i < word.length; i++) {
           if(vowelScoreStructure.includes(word[i].toUpperCase())){
              letterPoints += 3;
           } else {
              letterPoints += 1;
           }
        }
        return letterPoints;
    }
}

let scrabbleScorer = {
   name: 'Scrabble: ',
   description: 'Traditional scoring system',
   scoringFunction: function(word) {
    let letterPoints = 0;
    
    for (let i = 0; i < word.length; i++) {
       let lowercaseLetter = word[i].toLowerCase();

       if (lowercaseLetter in newPointStructure) {
           letterPoints += newPointStructure[lowercaseLetter];
       }
   
    }   
   return letterPoints;
   }	   
};

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer];

function scorerPrompt() {
    let word = ''
    console.log("Let's play some scrabble!\n");
    word = input.question('Enter a word to score: ')
    scoringOption = input.question(`Which scoring algorithm would you like to use?\n\n0 - ${scoringAlgorithms[0].name} ${scoringAlgorithms[0].description}\n1 - ${scoringAlgorithms[1].name}${scoringAlgorithms[1].description}\n2 - ${scoringAlgorithms[2].name}${scoringAlgorithms[2].description}\nEnter 0, 1, or 2: `)
    console.log(`Score for '${word}': ` + scoringAlgorithms[scoringOption].scoringFunction(word));
}

function transform(pointStructure) {
   let newNew = {};
   for (const pointValue in pointStructure) {
       let letters = pointStructure[pointValue];
       for (let i = 0; i < letters.length; i++) {
           let lowercaseLetter = letters[i].toLowerCase();
           newNew[lowercaseLetter] = Number(pointValue);
               }
   }
   return newNew;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};


