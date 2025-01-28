import fs from "fs";
import path from "path";

export const loggerfunction = (requestBody , date) => {
    try {
        fs.appendFileSync('./thlog.txt',`\n  ${requestBody.method}  ${requestBody.url}  ${date}   ${JSON.stringify(requestBody.body)} ` );
    } catch (error) {
        console.log(error);
    }
    }