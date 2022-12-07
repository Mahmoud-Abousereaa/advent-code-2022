import { readFileSync } from 'fs';

// interface Range {
//   lowerLimit: number;
//   upperLimit: number;
// }

function main() {
  const datastream:string = readFileSync('./input.txt', 'utf-8');
  const signal:Array<string> = datastream.split('');
  if (!signal || signal.length < 1) return;

  let startOfMessageMarker:Array<string> = [];
  let firstMessageMarker:number = 0;
  signal.forEach((character:string, idx:number) => {
    if (startOfMessageMarker.length > 13) return;

    if (startOfMessageMarker.includes(character)) {
      let removeRepeated:boolean = false;
      for (let i:number = 0; i < startOfMessageMarker.length; i++) {
        if (removeRepeated) continue;

        const ch:string|undefined = startOfMessageMarker.shift();
        i--;
        if (ch === character) {
          removeRepeated = true;
        }
      }
    }

    startOfMessageMarker.push(character);
    firstMessageMarker = idx+1;
  });

  console.log(`First message marker is ${firstMessageMarker}`);
}

main();