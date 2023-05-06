const fs = require("fs");
const path = require("path");
const pathToFiles = path.join(__filename, "secret-folder");
fs.readdir(pathToFiles, function(err, files) {
console.log(files);
})

