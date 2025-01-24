import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import 'dotenv/config';
import users from "./constant.js";
import { type } from "os";
console.log(users);


const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.APP_PORT;
app.use(express.json());

app.use((req,res,next)=>{
    fs.appendFileSync('./thlog.txt',`\n  ${req.method}            ${req.url}           ${Date.now()}             Hello I am a ${req.method} method ` );
    next();
})

app.use("/users/:id",(req,res,next)=>{
    if((req.method == "GET" || req.method == "PATCH" || req.method == "DELETE")){
            users.forEach(user => {
                (user.id == req.params.id) ? next() : res.send("no such user found");
            })
        };
})

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
    let lastElement = users[0];
    data.id = lastElement.id + 1;
    users.push(lastElement);
    users.push(data);
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