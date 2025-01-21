const args = process.argv;
let arg1 = Number(args[2]) * 1000;
let arg2 = args[3];
console.log("A reminder is set for " + arg2 + " after " + arg1);
setTimeout(() => {
    console.log("Reminder!!! \n" + arg2);
}, arg1);
