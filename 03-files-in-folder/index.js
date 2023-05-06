const fs = require("fs");
const path = require("path");
const fsPromis = fs.promises;
const pathToFiles = path.join(__dirname, "secret-folder");

fsPromis.readdir(pathToFiles, { withFileTypes: true }).then((values) => {
  values.forEach((value) => {
    if (!value.isDirectory()){
    const pathFile = path.join(__dirname, "secret-folder", value.name);
    const name = path.basename(pathFile);
    const typeFile = path.extname(pathFile);

    fsPromis.stat(pathFile).then((val) => {

        console.log(
        `${name.replace(typeFile, "")} - ${typeFile.replace(".", "")} - ${Number(
          val.size)}b`);
    });
  }
  });
});
