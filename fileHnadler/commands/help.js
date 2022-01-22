let fs=require("fs");
let path=require("path");
function helpfn(dirPath){
    console.log(`List of all the Command:
                    node main.js tree "directoryPath"
                    node main.js organise "directoryPath"
                    node main.js help`);
}

module.exports={
    helpKey: helpfn
}