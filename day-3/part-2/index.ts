import { readFileSync } from 'fs';

function main() {
  const fileContent:string = readFileSync('./input.txt', 'utf-8');
  const rucksackGroups:RegExpMatchArray|null = fileContent.match(/(?=[\s\S])(?:.*\n?){1,3}/g);
  if (!rucksackGroups) return;

  const alphabet = new Array(26).fill(1).map((item, idx) => String.fromCharCode(97 + idx));
  let totalSum:number = 0;
  let rucksackItemPriority:number = 0;

  rucksackGroups.forEach((rucksackGroup:string) => {
    if (!rucksackGroup) return;
    rucksackItemPriority = 0;

    const rucksackGroupArr:Array<string> = rucksackGroup.split('\n');
    const firstRucksack:string|undefined = rucksackGroupArr.shift();
    const secondRucksack:string|undefined = rucksackGroupArr.shift();
    const thirdRucksack:string|undefined = rucksackGroupArr.shift();

    const rucksackItem:string|undefined = findGroupBadge(firstRucksack, secondRucksack, thirdRucksack);

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

function findGroupBadge(firstRucksack:string|undefined, secondRucksack:string|undefined, thirdRucksack:string|undefined):string|undefined {
  if (!secondRucksack || !thirdRucksack) {
    throw new Error('Called findGroupBadge function without a full rucksack group');
  }

  return firstRucksack?.split('').find((char:string):boolean => secondRucksack?.includes(char) && thirdRucksack.includes(char));
}

main();