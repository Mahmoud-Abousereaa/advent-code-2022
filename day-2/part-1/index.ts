import { readFileSync } from 'fs';

function main() {
  const fileContent:string = readFileSync('./input.txt', 'utf-8');
  const rounds:Array<string> = fileContent.split('\n');

  let totalScore:number = 0;
  let roundScore:number = 0;

  const elfPossibleOptions:Array<string> = ['A', 'B', 'C'];
  const myPossibleOptions:Array<string> = ['X', 'Y', 'Z'];

  rounds.forEach((round) => {
    roundScore = 0;

    const roundChoices = round.split(' ');
    if (roundChoices.length < 1) return;

    const elfChoice:string|undefined = roundChoices.slice().shift();
    const myChoice:string|undefined = roundChoices.pop();

    if (!elfChoice) {
      throw new Error('Elf did not shoot');
    }

    if (!myChoice) {
      throw new Error('I did not have enough time to shoot!');
    }

    if (!elfPossibleOptions.includes(elfChoice)) {
      throw new Error('Elf chose an invalid option');
    }

    if (!myPossibleOptions.includes(myChoice)) {
      throw new Error('Sorry I thought we finished playing rock paper scissors and started another game');
    }

    if (elfChoice === 'A') {
      roundScore = elfChoseRock(myChoice, roundScore);
    } else if (elfChoice === 'B') {
      roundScore = elfChosePaper(myChoice, roundScore);
    } else {
      roundScore = elfChoseScissors(myChoice, roundScore);
    }

    totalScore = totalScore + roundScore;
  });

  console.log(`totalScore is ${totalScore}`);
}

function elfChoseRock(myChoice:string, roundScore:number):number {
  if (myChoice === 'X') {
    roundScore = 4;
  } else if (myChoice === 'Y') {
    roundScore = 8;
  } else {
    roundScore = 3;
  }

  return roundScore;
}

function elfChosePaper(myChoice:string, roundScore:number):number {
  if (myChoice === 'X') {
    roundScore = 1;
  } else if (myChoice === 'Y') {
    roundScore = 5;
  } else {
    roundScore = 9;
  }

  return roundScore;
}

function elfChoseScissors(myChoice:string, roundScore:number):number {
  if (myChoice === 'X') {
    roundScore = 7;
  } else if (myChoice === 'Y') {
    roundScore = 2;
  } else {
    roundScore = 6;
  }

  return roundScore;
}

main();