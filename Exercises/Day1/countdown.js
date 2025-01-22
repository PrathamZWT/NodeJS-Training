const args = process.argv;
  let arg1 = args[2];
  try {
    if(arg1 === undefined) throw "!!! INVALID INPUT nothing given in input !!!"
    if(typeof(arg1) !== "number") throw "!!! INVALID INPUT input must be a number and greater then 0 !!!"
    console.log("Count Down for "+arg1+" is Started!!!");
    let countdown = setInterval(()=>{
      console.log(arg1--);
      if(arg1 < 0){
        clearInterval(countdown);
      }
    },1000)
  } catch (error) {
    console.log(error);
  }
    