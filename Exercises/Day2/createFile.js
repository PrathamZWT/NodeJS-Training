const fs = require('fs');
const path = require('path');
const { writeFile } = require('fs/promises');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
}
)
addFile()
function addFile() {
    try {

        rl.question("Enter the name of the .txt file you want to create\n", (fileName) => {
            const filePath = path.join(__dirname, "allFiles", fileName + ".txt");
            if (fs.existsSync(filePath) === true) {
                console.log(" File already exists!!! \n\n\n");
                rl.question("do you want to overwrite it \n type y for yes and n for no", (ans) => {
                    if (ans !== 'n' && ans !== 'y') throw "invalid Input!!!"
                    if (ans === 'y') {
                        rl.question("enter the content you want to add to the file\n", (content) => {
                            fs.writeFileSync(filePath, content);
                            (fs.statSync(filePath).isFile()) ? console.log("file is create successfully") : console.log("file not created");
                            addMore();
                        })
                    }
                    else if (ans === 'n') {
                        console.log("Ok Restarting the process \n Try with a new name");
                        addFile();
                    }
                })
            }
            rl.question("enter the content you want to add to the file\n", (content) => {
                fs.writeFileSync(filePath, content);
                (fs.statSync(filePath).isFile()) ? console.log("file is create successfully") : console.log("file not created");
                addMore();
            })
        })
    } catch (error) {
        console.log(error);

    }
}

function addMore() {
    rl.question("do you want to add more files \n type y for yes and n for no", (ans2) => {
        if (ans2 === 'y') {
            addFile();
        }
        else {
            console.log("Thank You !!! for choosing our services 😊");

        }
    })
}