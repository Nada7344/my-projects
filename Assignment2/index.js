const path = require("node:path");
const EventEmitter = require("node:events");
const fs =require("node:fs")
const event = new EventEmitter();
const os = require("node:os");
const filePath =path.resolve("./data.txt");
const filePath1 =path.resolve("./file.txt");


//Q1:-
function currentPath() {
    console.log({ File: __filename, Dir: __dirname, });
}
currentPath();

//Q2:-
const fileName = function (fillePath) {
    return path.basename(fillePath);
}
console.log(fileName("/user/files/report.pdf"));

//Q3:-
const buildPath = function (data) {
    return path.format(data);
}
let x = { dir: "/folder", name: "app", ext: ".js" };
console.log(buildPath(x));


//Q4:-
const extensionName = function (fillePath) {
    return path.extname(fillePath);
}
console.log(extensionName("/docs/readme.md"));
//Q5:-
const parsePath = function (fillePath) {
    let pathObj = path.parse(fillePath);
    return { Name: pathObj.name, Ext: pathObj.ext }
}
console.log(parsePath("/home/app/main.js"));


//Q6:
const checkPath = function (filePath) {
    return path.isAbsolute(filePath);
}
console.log(checkPath("/home/user/file.txt"));
//Q7:-
const joinPaths = function (...data) {

    console.log(path.join(...data));
}
joinPaths("src", "components", "App.js");

//Q8:-
const resolvePaths = function (...data) {

    console.log(path.resolve(...data));
}
resolvePaths('./index.js');

//Q9:-
const joinTwoPaths = function (path1, path2) {

    console.log(path.join(path1, path2));
}
joinTwoPaths('/folder1', 'folder2/file.txt');

//Q10:
function deleteFile(filePath) {
    if (fs.existsSync(filePath)) { 
    fs.unlink(filePath, (error) => {
      if (error) {
        console.log("Error deleting the file:", error);
      } else {
        console.log(`The file deleted successfully.`);
      }
    });
  }else{
    console.log("File not found");
  }
}
deleteFile(filePath1);


//Q11:-
function createFolder(folderName) {
   try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
            console.log("Success");
        } else {
            console.log("Folder already exists");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

createFolder("myFolder");



//Q12:
event.on("start", () => {
    console.log("Welcome event triggered!");

})
event.emit("start");

//Q13:-
event.on("login", (username) => {
    console.log(` User logged in:${username} `);

})
event.emit("login","Ahmed");

//Q14:
function readFileSynchronously(filePath){

    try {
    const result =fs.readFileSync(filePath,{encoding:"utf-8"})
    console.log(`the file content => "${result}"`);
    } catch (error) {
        console.error("Error:", error);
    }
}
readFileSynchronously("./notes.txt");


//Q15:-
function writeFileAsynchronously(filePath,content)
{ 
    fs.writeFile(filePath, content,(error)=>{
if (error) {
    return console.log(error); 
}
console.log("File written successfully");

})
}
writeFileAsynchronously("./async.txt", "Async save")



//Q16:-

function checkDirectory(directoryName){
    return fs.existsSync(directoryName);
}
console.log(checkDirectory("./notes.txt"));

//Q17:-
function getSystemInfo() {
    return {
        Platform: os.platform(),
        Arch: os.arch()
    };
}

console.log(getSystemInfo());