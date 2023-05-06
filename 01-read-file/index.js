const fs = require("fs");
const path = require("path");
const pathToText = path.join(__dirname, "/text.txt")
const stream = fs.createReadStream(pathToText);

stream.on("data", (text) => {
  console.log(text.toString());
});
