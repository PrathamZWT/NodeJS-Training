const args = process.argv;
let arg1 = (args[2]);
try {
    if(typeof(arg1) !== "string" || (arg1 !== "true" && arg1 !== "false")) throw "!!! INVALID INPUT !!!"
    function fetchData(success) {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {(success === "true") ? resolve("Data fetched successfully!") :  reject("Error: Failed to fetch data.")}, 2000);
        })
    }
    fetchData(arg1).then(value => {console.log(value)}).catch(error => {console.log(error);
    })
    
} catch (error) {
    console.log(error);
    
}