#! /usr/bin/env node

import inquirer from "inquirer";

const randomNumber: number = Math.floor(Math.random() * 100 + 1);
let roundsPlayed: number = 10;

console.log(`Welcome to Guess the number Game.`);
console.log(
  `Here I think the number between 1 and 100 in ${roundsPlayed} rounds.`
);

async function askToGuess() {
  if (roundsPlayed > 0) {
    const answer = await inquirer.prompt([
      {
        type: "number",
        name: "guess",
        message: `Guess a number between 1 and 100 in ${roundsPlayed} rounds ->`,
        validate: (input: string) => {
          const num = parseFloat(input);
          if (isNaN(num) || num < 1 || num > 100) {
            console.log("Please enter a valid number between 1 to 100.");
            return false;
          }
          return true;
        },
      },
    ]);

    const guess = parseFloat(answer.guess);
    if (!isNaN(guess)) {
      roundsPlayed--;
      checkGuess(guess);

    }
  } else {
    console.log("You lost the number is ", randomNumber);
    process.exit();
  }
}

function checkGuess(guess: number) {
  if (guess === randomNumber) {
    console.log(
      "Congrats! the secret number is ",
      guess,
      " You got it in ",
      10 - roundsPlayed,
      " rounds."
    );
    process.exit(0);
  } else if (guess < randomNumber) {
    console.log("Too low!");
    askToGuess();
  } else if (guess > randomNumber) {
    console.log("Too high!");
    askToGuess();
  }
}

askToGuess();
