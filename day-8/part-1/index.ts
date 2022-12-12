import { readFileSync } from 'fs';

function main() {
  const fileContent:string = readFileSync('./input.txt', 'utf-8');
  const dataStream:Array<string> = fileContent.split('\n');
  if (!dataStream || dataStream.length < 1) return;

  let visibleTrees:number = 0;
  const trees:number[][] = dataStream.reduce((data:number[][], row:string) => {
    const strArr:Array<string> = row.split('');
    const numArr:Array<number> = strArr.reduce((arr:number[], i:string) => {
      arr.push(Number(i));
      return arr;
    }, []);

    data.push(numArr);

    return data;
  }, []);

  trees.forEach((row:Array<number>, rowIdx:number) => {
    if (rowIdx === 0 || rowIdx === trees.length - 1) {
      visibleTrees = visibleTrees + row.length;
      return;
    }

    row.forEach((treeHeight:number, colIdx:number) => {
      if (colIdx === 0 || colIdx === row.length - 1) {
        visibleTrees++;
        return;
      }

      const column:Array<number> = trees.reduce((arr:Array<number>, t:Array<number>) => {
        if (t[colIdx] !== undefined) {
          arr.push(t[colIdx]);
        };

        return arr;
      }, []);

      const visibleFromTop:boolean = checkTopView(column, treeHeight, rowIdx);
      if (visibleFromTop) {
        visibleTrees++;
        return;
      }

      const visibleFromBottom:boolean = checkBottomView(column, treeHeight, rowIdx);
      if (visibleFromBottom) {
        visibleTrees++;
        return;
      }

      const visibleFromRight:boolean = checkrightView(row, treeHeight, colIdx);
      if (visibleFromRight) {
        visibleTrees++;
        return;
      }

      const visibleFromLeft:boolean = checkLeftView(row, treeHeight, colIdx);
      if (visibleFromLeft) {
        visibleTrees++;
      }
    });
  });

  console.log(`Number of visible trees in the gird is ${visibleTrees}`);
}

function checkTopView(column:Array<number>, treeHeight:number, treeIndex:number):boolean {
  let isVisible:boolean = true;
  column = column.slice(0, treeIndex).reverse();

  const aboveTrees:Array<number> = column.reduce((arr:Array<number>, height:number) => {
    if (height >= treeHeight) {
      arr.push(height);
    }
    return arr;
  }, []);
  if (aboveTrees.length > 0) isVisible = false;

  return isVisible;
}

function checkBottomView(column:Array<number>, treeHeight:number, treeIndex:number):boolean {
  let isVisible:boolean = true;
  column = column.slice(treeIndex + 1, column.length);

  const bottomTrees:Array<number> = column.reduce((arr:Array<number>, height:number) => {
    if (height >= treeHeight) {
      arr.push(height);
    }
    return arr;
  }, []);
  if (bottomTrees.length > 0) isVisible = false;

  return isVisible;
}

function checkrightView(row:Array<number>, treeHeight:number, treeIndex:number):boolean {
  let isVisible:boolean = true;
  row = row.slice(treeIndex + 1, row.length);

  const rightTrees:Array<number> = row.reduce((arr:Array<number>, height:number) => {
    if (height >= treeHeight) {
      arr.push(height);
    }
    return arr;
  }, []);
  if (rightTrees.length > 0) isVisible = false;

  return isVisible;
}

function checkLeftView(row:Array<number>, treeHeight:number, treeIndex:number):boolean {
  let isVisible:boolean = true;
  row = row.slice(0, treeIndex).reverse();

  const leftTrees:Array<number> = row.reduce((arr:Array<number>, height:number) => {
    if (height >= treeHeight) {
      arr.push(height);
    }
    return arr;
  }, []);
  if (leftTrees.length > 0) isVisible = false;

  return isVisible;
}

main();