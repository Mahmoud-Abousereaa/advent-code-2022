import { readFileSync } from 'fs';

const fileContent = readFileSync('./input.txt', 'utf-8');
const data = fileContent.split('\n');
let elfNumber:number = 1;
let elfCalories:number = 0;
let topThreeCalories:Array<number> = [0, 0, 0];
let topThreeRichestElf:Array<number> = [];

data.forEach((i) => {
  if (i) {
    elfCalories = elfCalories + Number(i);
  } else {
    const loserElf:boolean = topThreeCalories.some((c) => c < elfCalories);
    const poorElfIndex:number = topThreeCalories.indexOf(Math.min(...topThreeCalories));
    if (loserElf) {
      topThreeCalories.splice(poorElfIndex, 1);
      topThreeCalories.push(elfCalories);
    }

    elfCalories = 0;
    elfNumber++;
  }
});

const answer = topThreeCalories.reduce((a, b) => a + b, 0);
console.log('answer', answer);