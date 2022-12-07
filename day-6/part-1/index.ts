import { readFileSync } from 'fs';

function main() {
  const datastream:string = readFileSync('./input.txt', 'utf-8');
  const signal:Array<string> = datastream.split('');
  if (!signal || signal.length < 1) return;

  let startOfPacketMarker:Array<string> = [];
  let firstPacketMarker:number = 0;
  signal.forEach((character:string, idx:number) => {
    if (startOfPacketMarker.length > 3) return;

    if (startOfPacketMarker.includes(character)) {
      let removeRepeated:boolean = false;
      for (let i:number = 0; i < startOfPacketMarker.length; i++) {
        if (removeRepeated) continue;

        const ch:string|undefined = startOfPacketMarker.shift();
        i--;
        if (ch === character) {
          removeRepeated = true;
        }
      }
    }

    startOfPacketMarker.push(character);
    firstPacketMarker = idx+1;
  });

  console.log(`First packet marker is ${firstPacketMarker}`);
}

main();