const fs = require("fs");
const pathToFile = (__filename, "files");
const filesCopy = (__filename, "files-copy");
fs.copyFile(pathToFile, filesCopy, (error) => {
    if (error) {
        throw error;
    } else {
        console.log("Succes");
    }
})
