export const validateIsActive = (isActive)=>{
    if(typeof isActive !== "boolean"){
        return true;
    }
    else{
        return false;
    }
}