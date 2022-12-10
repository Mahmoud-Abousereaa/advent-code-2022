import { readFileSync } from 'fs';

interface Directory {
  parentDir: string;
  dirName: string;
  totalSize: number;
  level: number;
  directories: Array<string>
}
const fileSystem:Array<Directory> = [];

function main() {
  const fileContent:string = readFileSync('./input.txt', 'utf-8');
  const commands:Array<string> = fileContent.split('\n');
  if (!commands || commands.length < 1) return;

  let parentDirectory:string = '';
  let currentDirectory:string = '';
  let populateFileSystem:boolean = false;
  let systemLevel:number = 0;
  commands.forEach(async (command:string) => {
    if (command.includes('$ cd') && !command.includes('..')) {
      parentDirectory = currentDirectory;
      systemLevel++;
      const directoryName = command.replace('$ cd ', '');
      fileSystem.push({
        parentDir: parentDirectory,
        dirName: directoryName,
        totalSize: 0,
        level: systemLevel,
        directories: [],
      });

      currentDirectory = directoryName;
      populateFileSystem = false;
    }

    if (command.includes('..')) {
      systemLevel--;
      const dir = getCurrentDirectory(currentDirectory, parentDirectory, systemLevel);
      currentDirectory = parentDirectory;
      parentDirectory = dir.parentDir;
      populateFileSystem = false;
    }

    if (command.includes('$ ls')) {
      populateFileSystem = true;
    }

    if (populateFileSystem) {
      const directoryIdx:number = fileSystem.findIndex((f:Directory) => f.dirName === currentDirectory && f.level === systemLevel && f.parentDir === parentDirectory);
      const fileSize:number|null = Number(command.match(/^\d*/g)?.pop());

      if (command.includes('dir')) {
        fileSystem[directoryIdx].directories.push(command.replace('dir ', ''));
      }
      if (fileSize) {
        fileSystem[directoryIdx].totalSize = fileSystem[directoryIdx].totalSize + fileSize;
        await addSizeToParentDirectory(directoryIdx, fileSize, systemLevel);
      }
    }
  });

  const totalSumOfDirSize = fileSystem.reduce((a:number, f:Directory) => {
    if (f.totalSize <= 100000) {
      a = a + f.totalSize;
    }

    return a;
  }, 0);

  console.log(`The total sum of directories size with a total size of at most 100000 is ${totalSumOfDirSize}`);
  // console.log(JSON.stringify(fileSystem));
}

function getCurrentDirectory(prevDirectory:string, directory:string, systemLevel:number):Directory {
  let currentDirectory:string = directory;
  let scopedLevel:number = systemLevel;
  const dir:Directory|undefined = fileSystem.find((f:Directory) => f.dirName === currentDirectory && f.level === scopedLevel && f.directories.includes(prevDirectory));
  if (!dir) {
    throw new Error(`Can not find a directory named ${directory}`);
  };

  return dir;
}

async function addSizeToParentDirectory(dirIdx:number, size:number, systemLevel:number) {
  const directory:Directory = fileSystem[dirIdx];
  const parentDir:string = directory.parentDir;
  const currentDirectory:string = directory.dirName;
  let scopedLevel:number = systemLevel - 1;
  if (!parentDir) return;

  const parentDirIdx:number = fileSystem.findIndex((f:Directory) => {
    return f.dirName === parentDir &&
      f.level === scopedLevel &&
      f.directories.includes(currentDirectory);
  });

  fileSystem[parentDirIdx].totalSize = fileSystem[parentDirIdx].totalSize + size;
  await addSizeToParentDirectory(parentDirIdx, size, scopedLevel);
}

main();