const fs = require("fs");
const path = require("path");
let fileNameArray = [];
try {
    const filesDirPath = path.resolve(__dirname, 'allFiles');
    function fetchFileName() {   
        fileNameList=fs.readdirSync(filesDirPath);
        fileNameList.forEach(fileName =>{
            if(path.extname(fileName) !== ""){
                fileNameArray.push(fileName);
            }
        })
    }
} catch (error) {
    console.log(error);
}
fetchFileName();
printList();
function printList() {
    let count = 0;
    fileNameArray.forEach(file =>{
        console.log("\n" + ++count + " :- " + file);
    })
}

module.exports = fileNameArray;