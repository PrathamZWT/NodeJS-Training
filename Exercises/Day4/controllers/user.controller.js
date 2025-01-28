import users from "../../../constant.js"
import fs from "fs";
import { validateAge } from "../validators/ageValidator.js";
import { validateEmail } from "../validators/emailValidator.js";
import { validateIsActive } from "../validators/isActiveValidator.js";
import { validateRole } from "../validators/roleValidator.js";
import { validateName } from "../validators/nameValidator.js";
import { ifError } from "assert";
import { addUserDB, addUserImageDB, deleteUserDB, getUsersDB, updateUserDB, userExistsDB } from "../models/user.model.js";

// Task 1
export const home = (req,res)=>{
    res.status(200).json({message : "Welcome to the User Management API!"});
}

// Task 2

export const getUsers = async (req,res)=>{
    try{
    let users = await getUsersDB();
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
}catch(error){
    console.log(error);
    
}
}

export const getUserById = async (req,res)=>{
    const uID = req.params.id;  
    if(isNaN(uID)){
        return res.status(422).json({message : "Invaild Entry Unprocessable Entity"}) 
    }
    try {
        return res.status(200).json({userData : await getUsersDB(uID)});
    } catch (error) {
        console.log(error);
    }
}
            
export const addUser = async (req,res)=>{
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
        try {
           let added =  await addUserDB(name, email, age,role, isActive )
           if(added){
               res.status(200)
               .json({message : "user added succesfully"});
            }
            else{
                res.status(404)
                .json({message : "user was not added"});
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }
}

export const updateUser = async (req,res)=>{
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

    try {
        
        let updated = await updateUserDB(req.body,uID);
        if(updated){
            return res.status(200).json({
               message: "User updated succesfully"});
        }
        else{
            return res.status(404).json({
               message: "User was not updated"});
            }
            
        }
        catch(error) {
            return res.status(404).json({
               message: `User was not updated ${error}`});
            
        }
    }
        


export const deleteUser = async (req,res)=>{
    let uID = Number(req.params.id); 
    try {
        let result = await deleteUserDB(uID);
        if(result){
            res.status(200).json({
                message: "User deleted succesfully"
            });
        }
    } 
    catch (error) {
        res.status(404).json({
            message: "User deleted succesfully" 
        })
    }
}

export const uploadImage = async (req,res)=>{
    console.log(req.body);
    console.log(req.body.id);
    console.log(req.file);
    try {
        
        let userexists = await userExistsDB(req.body.id);
        console.log(userexists);
        
        if(userexists){
            console.log(req.file);
            
            let imageAdded = await addUserImageDB(req.body.id, req.file);
            if(imageAdded){
                res.status(200).json({
                message: "User image updated succesfully"
            });
        }
        else{
            res.status(200).json({
                message: "error occuerd in adding user image ]"
            });   
        }
    }
    else{
        res.status(404).json({
            message: "no such user exists"})
        }
    } catch (error) {
        console.log(error)
        
    }
    
}