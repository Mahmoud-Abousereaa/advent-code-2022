import { readFileSync } from 'fs';

function main() {
  const fileContent:string = readFileSync('./input.txt', 'utf-8');
  const rucksacks:Array<string> = fileContent.split('\n');

  const alphabet = new Array(26).fill(1).map((item, idx) => String.fromCharCode(97 + idx));
  let totalSum:number = 0;
  let rucksackItemPriority:number = 0;

  rucksacks.forEach((rucksack:string) => {
    if (!rucksack) return;

    rucksackItemPriority = 0;
    const firstCompartment:string = rucksack.substring(rucksack.length/2);
    const secondCompartment:string = rucksack.substring(0, rucksack.length/2);

    const rucksackItem:string|undefined = findCommonCharacter(firstCompartment, secondCompartment);
    let rucksackItemScore:number = alphabet.findIndex((c:string) => c === rucksackItem);
    rucksackItemPriority = (rucksackItemScore !== -1) ? rucksackItemScore + 1 : 0;
    if (rucksackItemPriority === 0) {
      rucksackItemScore = alphabet.findIndex((c:string) => c.toUpperCase() === rucksackItem);
      rucksackItemPriority = rucksackItemScore + 27;
    }

    totalSum = totalSum + rucksackItemPriority;
  });

  console.log(`totalPriortyScore is ${totalSum}`);
}

function findCommonCharacter(firstStr:string, secondStr:string):string|undefined {
  return firstStr.split('').find((char:string):boolean => secondStr.includes(char));
}

main();