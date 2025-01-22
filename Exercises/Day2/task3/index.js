const http = require("http");
const fs = require('fs');
const url = require('url');
const fileNameArray = require("../file"); 
const fileData = require("../task3/fileContentFetch");

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
                const fileName = myUrl.query.name;
            
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
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
            break;
    }
}).listen(8000, () => {
    console.log("\nServer is active on port 8000");
});
