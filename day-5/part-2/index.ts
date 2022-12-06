import { readFileSync } from 'fs';

// interface Range {
//   lowerLimit: number;
//   upperLimit: number;
// }

function main() {
  const fileContent:string = readFileSync('./input.txt', 'utf-8');
  const data:Array<string> = fileContent.split('\n\n');
  if (!data || data.length < 1) return;

  const stacksString:Array<string>|undefined = data.shift()?.split('\n');
  const stacks:string[][]|undefined = stacksString?.reduce((arr:string[][], stack:string) => {
    let count:number = 0;
    const stackCrates:Array<string> = stack.split(' ').reduce((cratesArr:Array<string>, crate:string, idx:number) => {
      if (!count || count % 4 === 0) {
        cratesArr.push(crate);
      }
      if (!crate) {
        count++;
      }
      return cratesArr;
    }, []);

    stackCrates.forEach((item:string, idx:number) => {
      if (!arr[idx]) {
        arr[idx] = [];
      }
      if (!item) return;
      arr[idx].push(item);
    });

    return arr;
  }, []);
  if (!stacks || stacks.length < 1) {
    throw new Error('There are no stacks');
  }

  const instructions:Array<string>|undefined = data.shift()?.split('\n');
  let pulledCrates:Array<string> = [];
  instructions?.forEach((instruction:string) => {
    pulledCrates = [];
    const instructionNumbers:Array<string>|null = instruction.match(/\d+/g);
    const quantityToMove:number = Number(instructionNumbers?.shift());
    const movedFrom:number = Number(instructionNumbers?.shift()) - 1;
    const movedTo:number = Number(instructionNumbers?.shift()) - 1;
    for (let i = 0; i < quantityToMove; i++) {
      const crate:string|undefined = stacks[movedFrom].shift();
      if (!crate) continue;
      pulledCrates.push(crate);
    }
    stacks[movedTo] = pulledCrates.concat(stacks[movedTo]);
  });

  let message:string = '';
  stacks.forEach((stack:Array<string>) => {
    message = message + stack.shift()?.replace('[', '').replace(']', '');
  });
  console.log(`The message is ${message}`);
}

main();