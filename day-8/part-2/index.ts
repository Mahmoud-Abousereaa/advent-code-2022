import { readFileSync } from 'fs';

function main() {
  const fileContent:string = readFileSync('./input.txt', 'utf-8');
  const dataStream:Array<string> = fileContent.split('\n');
  if (!dataStream || dataStream.length < 1) return;

  let scenicScore:Array<number> = [];
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
    row.forEach((treeHeight:number, colIdx:number) => {
      const column:Array<number> = trees.reduce((arr:Array<number>, t:Array<number>) => {
        if (t[colIdx] !== undefined) {
          arr.push(t[colIdx]);
        };

        return arr;
      }, []);

      const scenicTopScore:number = checkTopView(column, treeHeight, rowIdx);
      const scenicBottomScore:number = checkBottomView(column, treeHeight, rowIdx);
      const scenicRightScore:number = checkrightView(row, treeHeight, colIdx);
      const scenicLeftScore:number = checkLeftView(row, treeHeight, colIdx);
      const treeTotalScenicScore:number = scenicTopScore * scenicBottomScore * scenicRightScore * scenicLeftScore;
      scenicScore.push(treeTotalScenicScore);
    });
  });

  console.log(`highest scenic score possible for any tree is ${Math.max(...scenicScore)}`);
}

function checkTopView(column:Array<number>, treeHeight:number, treeIndex:number):number {
  let blockedView:boolean = false;
  column = column.slice(0, treeIndex).reverse();

  return column.reduce((score:number, height:number, idx:number) => {
    if (blockedView) return score;
    if (height >= treeHeight) {
      score++;
      blockedView = true;
    }
    if (height < treeHeight) {
      score++;
    }

    return score;
  }, 0);
}

function checkBottomView(column:Array<number>, treeHeight:number, treeIndex:number):number {
  let blockedView:boolean = false;
  column = column.slice(treeIndex + 1, column.length);

  return column.reduce((score:number, height:number, idx:number) => {
    if (blockedView) return score;
    if (height >= treeHeight) {
      score++;
      blockedView = true;
    }
    if (height < treeHeight) {
      score++;
    }

    return score;
  }, 0);
}

function checkrightView(row:Array<number>, treeHeight:number, treeIndex:number):number {
  let blockedView:boolean = false;
  row = row.slice(treeIndex + 1, row.length);

  return row.reduce((score:number, height:number, idx:number) => {
    if (blockedView) return score;
    if (height >= treeHeight) {
      score++;
      blockedView = true;
    }
    if (height < treeHeight) {
      score++;
    }

    return score;
  }, 0);
}

function checkLeftView(row:Array<number>, treeHeight:number, treeIndex:number):number {
  let blockedView:boolean = false;
  row = row.slice(0, treeIndex).reverse();

  return row.reduce((score:number, height:number, idx:number) => {
    if (blockedView) return score;
    if (height >= treeHeight) {
      score++;
      blockedView = true;
    }
    if (height < treeHeight) {
      score++;
    }

    return score;
  }, 0);
}

main();