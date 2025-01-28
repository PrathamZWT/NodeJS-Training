export const validateName = (name)=>{
    let regex =  /^[a-zA-Z\s]+$/;
    return regex.test(name);
}