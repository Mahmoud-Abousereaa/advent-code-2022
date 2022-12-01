import { readFileSync } from 'fs';

const fileContent = readFileSync('./input.txt', 'utf-8');
const data = fileContent.split('\n');
let elfNumber:number = 1;
let elfCalories:number = 0;
let maxCalories:number = 0;
let richestElf:number = 0;

data.forEach((i) => {
  if (i) {
    elfCalories = elfCalories + Number(i);
  } else {
    elfCalories = 0;
    elfNumber++;
  }

  if (elfCalories > maxCalories) {
    maxCalories = elfCalories;
    richestElf = elfNumber;
  }
});

console.log('richestElf', richestElf);
console.log('maxCalories', maxCalories);