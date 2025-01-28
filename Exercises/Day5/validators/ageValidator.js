export const validateAge = (age) => {
    if(isNaN(age)) return true;
    if(age > 150 || age < 0) return true;
}