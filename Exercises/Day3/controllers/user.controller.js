import users from "../../../constant.js"
import fs from "fs";
import { validateAge } from "../validators/ageValidator.js";
import { validateEmail } from "../validators/emailValidator.js";
import { validateIsActive } from "../validators/isActiveValidator.js";
import { validateRole } from "../validators/roleValidator.js";
import { validateName } from "../validators/nameValidator.js";
import { ifError } from "assert";

// Task 1
export const home = (req,res)=>{
    res.status(200).json({message : "Welcome to the User Management API!"});
}

// Task 2

export const getUsers = (req,res)=>{
    if (users) {
            let qrole = req?.query?.role;
            let qisActive = req?.query?.isActive;
            let qageGT = req?.query?.ageGT;
            let qageLT = req?.query?.ageLT;
            let filteredArray = users;
            if(qrole){
                if(!validateRole(qrole)){
                    filteredArray = filteredArray.filter(user => user.role == qrole);
                }
                else{
                   return res.status(404)
                    .json({message : "invaild entry"});
                }
            }
            if(qisActive){
                if(!validateIsActive(Boolean(qisActive))){
                    filteredArray = filteredArray.filter(user=>String(user.isActive) == qisActive);
                }   
                else{
                    return res.status(404)
                    .json({message : "invaild entry"});
                }
            }
            if(qageGT){
                if(!validateAge(Number(qageGT))){
                    filteredArray = filteredArray.filter(user=>user.age > qageGT);
                }
                else{
                    return res.status(404)
                    .json({message : "invaild entry"});
                }
                
            }
            if(qageLT){
                if(!validateAge(Number(qageLT))){
                    filteredArray = filteredArray.filter(user=>user.age < qageLT);
                }
                else{
                    return res.status(404)
                    .json({message : "invaild entry"});
                }
        };
       return res.status(200)
        .json({Users : filteredArray});
           
    }else{
        res.status(404)
            .json({message : "No users found !"});
    }
    let allUserName = users.map(user => user.name).join("<br>");
    res.send(allUserName);
}

export const getUserById = (req,res)=>{
    const uID = req.params.id;  
    if(isNaN(uID)){
        return res.status(422).json({message : "Invaild Entry Unprocessable Entity"}) 
    }
    const userExists = users.some((user)=>user.id == uID);
    if(userExists){
        return res.status(200).json({userData : users.find((user)=>user.id == uID)})
    }else{
        res.status(404).json({message:"No such user found"});
    }
}
            
export const addUser = (req,res)=>{
    const { name, email, age, role, isActive } = req?.body;
    if(!name || !email || !age || !role || !isActive ){
        res.status(404)
        .json({message : "Please fill all the input for creating a new user \n eg:- name,email,age,role,isActive"});
    }
    else if(!validateEmail(email)){
        res.status(404)
        .json({message : "Invalid email !!"});
    }
    else if(validateAge(age)){
        res.status(404)
        .json({message : "Invalid age !!"});
    }
    else if(validateRole(role)){
        res.status(404)
            .json({message : "Invalid Role must be admin or user!!"});
        }
    else if(validateIsActive(isActive)){
        res.status(404)
        .json({message : "Invalid isActive entry must be true or false !!"});
    }
    else{
        let next_id = users[0] + 1;
        users[0] = users[0] + 1;
        role = role.toLowerCase();
        users.push({ id : next_id, name, email, age,role, isActive });
        const new_users = `
        const users = [
            ${users.map(user => JSON.stringify(user)).join(",\n    ")}
            ];
            export default users;
            `;
            fs.writeFileSync("./constant.js", new_users);
            // console.log(users);
            
            res.status(200)
               .json({message : "user added succesfully"});
        
    }
}

export const updateUser = (req,res)=>{
    let uID = req.params.id;
    const { name, email, age, role, isActive } = req?.body;
    if(name){
        if(!validateName(name)){
        res.status(404)
        .json({message : "Invalid name !!"});
        }
    }
    if(email){
        if(!validateEmail(email)){
            res.status(404)
            .json({message : "Invalid email !!"});
        }
    }
    if(age){
        if(validateAge(age)){
        res.status(404)
        .json({message : "Invalid age !!"});
        }
    }
    if(role){
        if(validateRole(role)){
        res.status(404)
            .json({message : "Invalid Role must be admin or user!!"});
        }
        }
    if(isActive){if(validateIsActive(isActive)){
        res.status(404)
        .json({message : "Invalid isActive entry must be true or false !!"});
    }
    }
    
        users.find(user=>{
            if(user.id == uID) 
                {
                 if(name) user.name = req.body.name;
                 if(email) user.email = req.body.email;
                 if(age) user.age = req.body.age;
                 if(role) user.role = req.body.role;
                 if(isActive) user.isActive = req.body.isActive;
                 const new_users = `
                 const users = [
                     ${users.map(user => JSON.stringify(user)).join(",\n    ")}
                     ];
                     export default users;
                     `;
                     fs.writeFileSync("./constant.js", new_users);
                     // console.log(users);
                 return res.status(200).json({
                    message: "User updated succesfully"
                 });
                }
            })
        
}


export const deleteUser = (req,res)=>{
    let uID = Number(req.params.id); 
   
    const userIndex = users.findIndex(user => user.id === uID);
    if (!(userIndex < -1)) {
    users.splice(userIndex, 1);
    const new_users = `
                 const users = [
                     ${users.map(user => JSON.stringify(user)).join(",\n    ")}
                     ];
                     export default users;
                     `;
                     fs.writeFileSync("./constant.js", new_users);
    res.status(200).json({
        message: "User deleted succesfully"
     });
    } else {
    res.status(404).json({
        message: "User deleted succesfully"
     });
}
}