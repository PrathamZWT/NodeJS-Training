const args = process.argv;
let arg1 = (args[2]);
function fetchData(success) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(success === "true"){
                resolve("Data fetched successfully!");
            }
            else{
                reject("Error: Failed to fetch data.");
            }
        }, 2000);
    })
}
fetchData(arg1).then(value => {console.log(value)}).catch(error => {console.log(error);
})