const fs = require('fs');
const path = require('path');

function fileData(fileName) {
     const filePath = path.join(__dirname, ".." , "allFiles", fileName);
          
          if(fs.existsSync(filePath) === true){
              let data =  fs.readFileSync(filePath,"utf-8");
              return data;
          }
          else{
               return"no such file exists";
          }
     }
module.exports = fileData;