let fs=require("fs");
let path=require("path");

function treefn(dirPath){
    // console.log("Tree command implemented ",dirPath);
    //let destPath;
     if(dirPath==undefined)
     { 
         treeHelper(process.cwd(),"")
         //console.log("Kindly enter the path..");
         return ;
     }
     else{
         let doesExist =fs.existsSync(dirPath);
         if(doesExist){
            treeHelper(dirPath,"");
         }
         else{
             console.log("Kindly enter the Correct path..");
             return;
         }
     }
 }
 
 function treeHelper(dirPath, indent) {
     // is file or folder
     let isFile = fs.lstatSync(dirPath).isFile();
     if (isFile == true) {
         let fileName = path.basename(dirPath);
         console.log(indent + "├──" + fileName);
     } else {
         let dirName = path.basename(dirPath)
         console.log(indent + "└──" + dirName);
         let childrens = fs.readdirSync(dirPath);
         for (let i = 0; i < childrens.length; i++) {
             let childPath = path.join(dirPath, childrens[i]);
             treeHelper(childPath, indent + "\t");
         }
     }
 }

 module.exports = {
    treeKey: treefn
}