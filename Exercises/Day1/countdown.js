const args = process.argv;
  let arg1 = args[2];
  console.log("Count Down for "+arg1+" is Started!!!");
  let countdown = setInterval(()=>{
      console.log(arg1--);
    if(arg1 < 0){
        clearInterval(countdown);
    }
},1000)
