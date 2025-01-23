const http = require("http");
const fs = require('fs');
const url = require('url');
const fileNameArray = require("../file"); 
const fileData = require("../task3/fileContentFetch");
const path = require('path');


const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true);
    switch (myUrl.pathname) {
        case "/":
            res.end("Welcome to the home page!");
            break;

        case "/list":
            fileNameArray.forEach(file => {
                res.write(file + "\n");
            });
            res.end("Thank you");
            break;

            case "/file":
                let fileName = myUrl.query.name;
            
                if (!fileName) {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    res.end("Error: Missing 'name' query parameter");
                    return;
                }
            

                const data = fileData(fileName); // Synchronously fetch file data
            
                if (data.startsWith("Error")) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.end(data); // Send the error message if the file does not exist or there's a read error
                } else {
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end(data); // Send the file content as plain text
                }
                break;
                case "/create":
                res.writeHead(404, { "Content-Type": "text/plain" });
                let filecreateName = myUrl.query.name;
                let content = myUrl.query.content;
                const filePath = path.join(__dirname , ".." , "allFiles", filecreateName);
                if (fs.existsSync(filePath) === true) {
                                res.end(" File already exists!!! \n\n\n");
                }else{
                    fs.writeFileSync(filePath, content);
                                   if (fs.statSync(filePath).isFile()) {
                                    res.end("file is create successfully") ;
                                    return;
                                   }else {

                                res.end("file not created");
                            }
                                }
                break;
                case "/append":
                    let appendName = myUrl.query.name;
                    let appendContent = myUrl.query.content;
                    const fileappendPath = path.join(__dirname , ".." , "allFiles", appendName);
                    if (fs.existsSync(fileappendPath) !== true) {
                        res.end(" No such file  exists!!! \n\n\n");
                        return;
                    }
                    else{
                        fs.appendFileSync(fileappendPath, appendContent);
                        let updatedData =  fs.readFileSync(fileappendPath,"utf-8");
                        res.end(updatedData);
                    }
                    break;
                    case "/delete":
                        let deleteName = myUrl.query.name;
                        const filedeletePath = path.join(__dirname , ".." , "allFiles", deleteName);
                        if (fs.existsSync(filedeletePath) !== true) {
                            res.end("no such file exists");
                            return;
                        }
                        else{

                            fs.unlink(filedeletePath,(error,result)=>{
                                if(error){
                                    res.end("file was not deleted");
                                    return;
                                }else{
                                    if (fs.existsSync(filedeletePath) !== true) {
                                        res.end("file was deleted successfully");
                                        return;
                                    }
                                }
                            });  
                            break
                        }
                            
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
            break;
    }
}).listen(8000, () => {
    console.log("\nServer is active on port 8000");
});
