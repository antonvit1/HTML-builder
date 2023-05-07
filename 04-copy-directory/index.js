const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;
const copyFiles = fsPromises.copyFile;
const pathToFolder = path.join(__dirname, "files");
const pathfilesCopy = path.join(__dirname, "files-copy");
const rimraf = require("rimraf");

fs.access(pathfilesCopy, (error) => {
  if (!error) {
  fs.rm(pathfilesCopy, { recursive: true }, (erro) => {
    if (erro) {
        throw erro;
      } else {
        createFolderAndCopyFile();
      }
  })
  } else {
    createFolderAndCopyFile();
  }
});



function createFolderAndCopyFile() {
    fs.mkdir(pathfilesCopy, (err) => {
    if (err) {
      throw err;
    }
    console.log("directory is created");
  });

fsPromises.readdir(pathToFolder).then((filesInFolder) => {
      filesInFolder.forEach((everyFile) => {
    const filePath = path.join(__dirname, "files", everyFile);
    copyFiles(filePath, path.join(__dirname, "files-copy", everyFile));
    console.log(everyFile);
  });
});
}