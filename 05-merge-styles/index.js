const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;
const pathToFolderStyle = path.join(__dirname, "styles");
const pathToFolderProject = path.join(__dirname, "project-dist/bundle.css");
const writeStream = fs.createWriteStream(pathToFolderProject);

fsPromises.readdir(pathToFolderStyle, { withFileTypes: true }).then((files) => {
  files.forEach((file) => {
    if (!file.isDirectory()) {
      const pathFile = path.join(__dirname, "styles", file.name);
      const typeFile = path.extname(pathFile);

      if (typeFile.replace(".", "") === "css") {
        const readStream = fs.createReadStream(pathFile);
        readStream.on("data", (text) => {
          writeStream.write(text);
        });
      }
    }
  });
});
