
const fs = require("fs");
const path = require("path");
const pathToText = path.join(__dirname, "/userText.txt");
const stream = fs.createWriteStream(pathToText);
console.log("Please write you message")
let st = process.openStdin();
st.on("data", function(chunk) {

    if (chunk.toString().trim() === 'exit') {
        console.log("GOODBAY");
        process.exit();
    } else {

        console.log("Please, write your message")
        stream.write(chunk);

    }

    })

