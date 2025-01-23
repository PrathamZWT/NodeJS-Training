import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import 'dotenv/config';
import users from "./constant.js";
console.log(users);


const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.APP_PORT;
app.use(express.json());

// app.use((req,res,next)=>{
//     fs.appendFileSync('./thlog.txt',`\n  ${req.method}            ${req.url}           ${Date.now()}             Hello I am a ${req.method} method ` );
//     next();
// })

// app.use((req,res,next)=>{
//     const method = ["GET/users/:id","PATCH/users/:id",  "DELETE/users/:id"];
//     let tempPath = req.method+req.url;
//     console.log(tempPath);
    
//     if( GET/users/req.params.id == tempPath || PATCH/users/req.params.id == tempPath){
//         users.forEach(user => {
//             if(user.id == req.params.id){
//                 next();
//             }
//             else{
//                 res.send( `{ error: "User not found" }`);
//             }
//         });

//     }
//     next();
// })

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to the User Management API!</h>");
})
app.get("/users",(req,res)=>{
   let allUserName = users.map(user => user.name).join("<br>");
   res.send(allUserName);
})
app.get("/users/:id",(req,res)=>{
    let uID = req.params.id;
    console.log(uID);
    
    let uDetails ;
    users.forEach(user => {
        if(user.id == uID) 
            {
                console.log(typeof user);
                
                uDetails = user;
                console.log(uDetails);
                
            }
    });
    console.log(uDetails);
    
    res.send(` \n
        id : ${uDetails.id} \n 
        name : ${uDetails.name} \n
        email : ${uDetails.email} \n
        age : ${uDetails.age} \n
        role : ${uDetails.role} \n
        isActive : ${uDetails.isActive} \n
        `);
})

app.post("/users",(req,res)=>{
    const data = req.body;
    console.log(data);
    console.log(typeof data);
    console.log(typeof users);
    let lastElement = users.pop();
    data.id = lastElement.id + 1;
    users.push(lastElement);
    users.push(data);
    console.log(users);
    res.send("user added succesfully");
    
})

app.patch("/users/:id",(req,res)=>{
    let uID = req.params.id;
    console.log(uID);
    
    let updatedDetails = false;
    users.forEach((user,index) => {
        if(user.id == uID) 
            {
                user.name = req.body.name;
                user.email = req.body.email;
                user.age = req.body.age;
                user.role = req.body.role;
                user.isActive = req.body.isActive;
                updatedDetails = true;
                res.send("done");
                console.log(users);
            }
    });
})

app.delete("/users/:id" , (req,res)=>{
    let duID = Number(req.params.id);
    let deleteIndex = 0;
    users.forEach((element,index) => {
        if(element.id == duID){
            let deleteIndex = duID;
        }
    });
    users.splice(deleteIndex,1);
    console.log(users);
    
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})