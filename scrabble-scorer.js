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

 let simpleScorer = function(word) {
    return word.length
}

let vowelBonusScorer = function(word) {
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

let scrabbleScorer = function(word) {
    let letterPoints = 0;
     
     for (let i = 0; i < word.length; i++) {
        let lowercaseLetter = word[i].toLowerCase();

        if (lowercaseLetter in newPointStructure) {
            letterPoints += newPointStructure[lowercaseLetter];
        }
    }   
    return letterPoints;
}



function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let answer = input.question('Enter a word to score: ')
    console.log(simpleScorer(answer));
};

let simpleScore = {
   scorerFunction: simpleScorer,
   description: 'Each letter is worth 1 point.',
   name: 'Simple Score: '
   
    
}

let vowelBonusScore = {
   scorerFunction: vowelBonusScorer,
   description: 'Vowels are 3 points, consonants are 1 point.',
   name: 'Bonus Vowels: '
}

let scrabbleScore = {
   scorerFunction: scrabbleScorer,
   description: 'Traditional scoring system',
   name: 'Scrabble: '
   
}

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function letterCheck(letter) {
   return (letter >= 'a' && letter <= 'z' || letter >= 'A' && letter <= 'Z')
}

function validWord(word) {
   for (let i = 0; i < word.length; i ++) {
      if (!letterCheck(word[i])) {
         return false;
      }
   }
   return true;
}


function scorerPrompt() {
   let word = ''

   console.log("Let's play some scrabble!\n");

   word = input.question('Enter a word to score: ')
   while (!validWord(word)) {
      console.log('Invalid input. Please enter a word containing only letters');
      word = input.question('Enter a word to score: ');
   }
   scoringOption = input.question(`Which scoring algorithm would you like to use?\n\n0 - ${scoringAlgorithms[0].name} ${scoringAlgorithms[0].description}\n1 - ${scoringAlgorithms[1].name}${scoringAlgorithms[1].description}\n2 - ${scoringAlgorithms[2].name}${scoringAlgorithms[2].description}\nEnter 0, 1, or 2: `)
   while (true) {
      
      if (scoringOption == 1 || scoringOption == 2 || scoringOption == 0) {
         console.log(`Score for '${word}': ` + scoringAlgorithms[scoringOption].scorerFunction(word));
         break;
      } else { 
         scoringOption = input.question('Invalid input. Please select from the available options: ')

      }
   }
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

