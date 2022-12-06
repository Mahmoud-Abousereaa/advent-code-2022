import { readFileSync } from 'fs';

interface Range {
  lowerLimit: number;
  upperLimit: number;
}

function main() {
  const fileContent:string = readFileSync('./input.txt', 'utf-8');
  const pairAssignments:Array<string> = fileContent.split('\n');
  if (!pairAssignments || pairAssignments.length < 1) return;

  let duplicateAssignments:number = 0;

  pairAssignments.forEach((pairAssignment:string, idx:number) => {
    if (!pairAssignment) return;

    const assignment:Array<string> = pairAssignment.split(',');
    if (!assignment || assignment.length < 1) {
      console.log(`Can not find pair assignments on the file line ${idx+1}`);
      return;
    }

    const firstAssignment:string|undefined = assignment.shift();
    const secondAssignment:string|undefined = assignment.shift();
    const isDuplicateAssignment:boolean|undefined = findDuplicateAssignments(firstAssignment, secondAssignment);
    if (isDuplicateAssignment) {
      duplicateAssignments++;
    }
  });

  console.log(`total number of duplicate assignments is ${duplicateAssignments}`);
}

function findDuplicateAssignments(firstAssignment:string|undefined, secondAssignment:string|undefined):boolean|undefined {
  if (!secondAssignment) {
    throw new Error('Called findGroupBadge function without a full rucksack group');
  }

  const firstCoveredSectionRange:Range|undefined = getAssignmentCoveredSections(firstAssignment);
  const secondCoveredSectionRange:Range|undefined = getAssignmentCoveredSections(secondAssignment);
  if (!firstCoveredSectionRange) {
    throw new Error('Can not find first covered sections for first assingment');
  }
  if (!secondCoveredSectionRange) {
    throw new Error('Can not find second covered sections for first assingment');
  }
  const numberOfFirstCoveredSections:number|undefined = firstCoveredSectionRange.upperLimit - firstCoveredSectionRange.lowerLimit;
  const numberOfSecondCoveredSections:number|undefined = secondCoveredSectionRange.upperLimit - secondCoveredSectionRange.lowerLimit;

  const firstCoveredSections:Array<number> = new Array(numberOfFirstCoveredSections).fill(1).map((item, idx) => idx + firstCoveredSectionRange.lowerLimit);
  const secondCoveredSections:Array<number> = new Array(numberOfSecondCoveredSections).fill(1).map((item, idx) => idx + secondCoveredSectionRange.lowerLimit);

  return firstCoveredSections.every((item:number) => secondCoveredSections.includes(item)) || 
    secondCoveredSections.every((item:number) => firstCoveredSections.includes(item));
}

function getAssignmentCoveredSections(assignment:string|undefined):Range|undefined {
  const assignmentRange:Array<string>|undefined = assignment?.split('-'); 
  const lowerLimit:number|undefined = Number(assignmentRange?.shift());
  const upperLimit:number|undefined = Number(assignmentRange?.shift());

  return {
    lowerLimit,
    upperLimit: upperLimit + 1,
  }
}

main();