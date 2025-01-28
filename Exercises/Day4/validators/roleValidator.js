export const validateRole = (role) => {
    const Roles =  ["admin" , 'user'];
    let finalRole = role.toLowerCase();
    if(Roles.includes(finalRole)){
        return false;
    }
    else{
        return true;
    }
}