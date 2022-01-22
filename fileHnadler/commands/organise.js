let fs=require("fs");
let path=require("path");

function organisefn(dirPath){
    //console.log("Organize command implemented ",dirPath);
    //1. input ->directory path give
    let destPath;
    if(dirPath==undefined)
    {
       destPath= process.cwd();
        return ;
    }
    else{
        let doesExist =fs.existsSync(dirPath);
        if(doesExist){
            //2. create ->Organise files ->directory
            destPath =path.join(dirPath,"Organise files");
            if(fs.existsSync(destPath)==false)
            {
                fs.mkdirSync(destPath);
            }
        }
        else{
            console.log("Kindly enter the Correct path..");
            return;
        }
    }

    organiseHelper(dirPath,destPath);

}

function organiseHelper(src,dest)
{
    //3. Identify the categories of all the files present in that input directory
    let childNames =fs.readdirSync(src);
   // console.log(childNames);
   for(let i=0;i<childNames.length;i++)
   {
       let childAddress =path.join(src,childNames[i]);
       let isfile =fs.lstatSync(childAddress).isFile();
       if(isfile)
       {
          // console.log(childNames[i]);
          let category=getCategory(childNames[i]);
          console.log(childNames[i],"belongs to this ",category);

          //4. copy /cut files to that organized directory inside the any of the category folder.
          sendFiles(childAddress,dest,category);
       }
   }
}
function sendFiles(srcFiles,dest,category){
    let categorypath=path.join(dest,category);
    if(fs.existsSync(categorypath)==false){
        fs.mkdirSync(categorypath);
    }
    let fileName=path.basename(srcFiles);
    let destFilepath =path.join(categorypath,fileName);
    fs.copyFileSync(srcFiles,destFilepath);
    fs.unlinkSync(srcFiles);
}
function getCategory(name){
    //this function will give you the extension of the file.
    let ext=path.extname(name);
   // console.log(ext);
   ext=ext.slice(1);
   for( let type in types)
   {
       let cTypeArray =types[type];
       for(let i=0;i<cTypeArray.length;i++)
       {
           if(ext==cTypeArray[i])
           return type;
       }
   }
   return "others";
}

module.exports = {
    organizeKey: organisefn
}