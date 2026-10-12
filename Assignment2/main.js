// ============================================================part 1===========================================================================

// 1 -

// function accessPath()
// {
//    console.log({
//     File: __filename,
//     Dir: __dirname
//   });
  
// }
// accessPath("E:/home/user/project/index.js")


// =========================================================================================================================================

// 2 -

// const path = require("node:path");


// function FileName(file)
// { 
//    return path.basename(file)

// }

// console.log(FileName("/user/project/index.js"))



// =========================================================================================================================================

// 3 -

// const path = require("node:path")

// function Build(opj)
// {
    
// return path.posix.format(opj)

// }
// const input = { dir: "/folder", name: "app", ext: ".js" };

// console.log(Build(input))




// =========================================================================================================================================




// 4 -

// const path = require("node:path");


// function FileEx(file)
// { 
//    return path.extname(file)

// }

// console.log(FileEx("/user/project/index.js"))
 

// =========================================================================================================================================

// 5 -

// const path = require("node:path");

// function parsSe(PathFile) {
//   const parsed = path.parse(PathFile);

//   return {
//     Name: parsed.name,
//     Ext: parsed.ext
//   };
// }

// console.log(parsSe("/home/app/main.js"));


// =========================================================================================================================================

// 6 - 
// const path = require("node:path");

// function check(PathFile) {
  
//   return path.isAbsolute("PathFile")
// }

// console.log(check("/home/user/file.txt"));



// =========================================================================================================================================

// 7 - 
   
// const path = require("node:path");

// let joins =(...arr) => {
//     return path.join(...arr)
// }

// console.log(joins("src", "componuts", "app.js" ))


// =========================================================================================================================================


// 8 - 

// const path = require("node:path")

// const resolves = (...index)=>{
//   return path.resolve(...index)
// }

// console.log(resolves("./index.js"))



// =========================================================================================================================================

// 9 - 

//  const path = require("node:path");

// let joins =(...arr) => {
//     return path.posix.join(...arr)
// }

// console.log(joins("/folder1","/folder2/file.txt" ))


// =========================================================================================================================================

// 10 - 

// const fs = require("node:fs");
// const path = require("node:path");

// const del = (file) =>{

//   fs.unlink(file , (err)=>{
//     if(err){
//       console.log("error404");
//       return;
//     }
//     const FileName = path.basename(file);
//     console.log(`the ${FileName} is deleted`)
//   })

//   return;
// } 

// del("./index.js")


// =========================================================================================================================================

// 11 - 

// const fs = require("node:fs");
// const path = require("node:path");

// const createFile = (filePath)=>{
//   fs.writeFileSync(filePath , " //hello file sorce" , "utf-8" , (err =>{
//     if(err)
//     {
//       const erorCode= err.code ;
//       console.log(`eror ${erorCode}`) ;
//       return;
      
//     }
//     console.log("success")

//   }))
//   return;
// } 

// createFile("./index.js")


// =========================================================================================================================================

// 12 -


 
//   const EventEmitter = require("node:events");

// const eventHandler = new EventEmitter();

// eventHandler.on("start", () => {
//   console.log("Welcome");
// });

// eventHandler.emit("start")


// =========================================================================================================================================

// 13 - 

  //  const EventEmitter=require("node:events")
  //  const eventHandeler = new EventEmitter()
  //  eventHandeler.on("login",(userName)=>{
  //   console.log(`User logged in: ${userName}`)
  //  })
  //  eventHandeler.emit("login", "Ahmed");


// =========================================================================================================================================

  // 14 -

    //  const fs = require("node:fs")
    //  const path = require("node:path")
      
    //  try{
    //   let x = fs.readFileSync("./notes.txt", "utf-8")

    //   console.log(`the file content => "${x}"`)

    //  }catch{

    //   console.log("eror")

    //  }


// =========================================================================================================================================

    // 15 - 

// const fs = require("node:fs");

// fs.writeFile("./async.txt", "Async save", "utf-8", (err) => {
//   if (err) {
//     console.error("Error:", err.message);
//     return;
//   }
//   console.log("File saved successfully!");
// });


  //           و تقصد اني اعمل append  : 
// const fs = require("node:fs");

// fs.writeFile("./async.txt", "Async save", { flag: "a", encoding: "utf-8" }, (err) => {
//   if (err) {
//     console.error("Error:", err.message);
//     return;
//   }
//   console.log("File saved successfully!");
// });


// =========================================================================================================================================

// 16 -

//  const fs = require("node:fs")
//      const path = require("node:path")

//      console.log(fs.existsSync("./notes.txt"))


// =========================================================================================================================================

// 17 - 

//const os = require("node:os");
// const getSystemInfo = () => ({ Platform: os.platform(), Arch: os.arch() });
// console.log(getSystemInfo ())


// =========================================================================================================================================

// 18 - 
//       const fs = require("node:fs")
// var chanckcount = 0
//       const read = fs.createReadStream("./big.txt",{
//         encoding:"utf-8" ,
//         highWaterMark: 6 * 1024
//       })

//       read.on("data",(chunk)=>
//       {
        
//     console.log("===============================================================================================================----new-------=================================================================================================================")
//     console.log(chunk)
//      chanckcount++;
//       })
      
// read.on("end", () => {
//   console.log("=========================================================================================");
//   console.log(`Total Chunks: ${chanckcount}`);
// });

// =====================================================================================================================================================

 // 19 - 

// const fs = require ("node:fs")
// const readStream = fs.createReadStream("./source.txt" )
// const wrightStream = fs.createWriteStream("./dest.txt")

// readStream.on("data",(chunk)=>{
//   wrightStream.write(chunk)
  
// })

// readStream.on("end",()=>{
//   wrightStream.end()
//   console.log ("copied")
// })

// =====================================================================================================================================================

// 20 -

//    const fs = require("node:fs")
//     const zlib = require("node:zlib")
// const readStream = fs.createReadStream("./data.txt");
//     const gzib = zlib.createGzip()
//     const writeStream = fs.createWriteStream("./data.txt.gz");

//     readStream
//   .pipe(gzib)
//   .pipe(writeStream)
//   .on("finish", () => {
//     console.log("File compressed successfully");
//   });

//========================================================== part 2================================================================================

// 1 - 

// const http = require("node:http");
// const fs = require("node:fs");
// const path = require("node:path");

// const filePath = path.join(__dirname, "users.json");

// function readUsers() {
//   if (!fs.existsSync(filePath)) return {};
//   const fileContent = fs.readFileSync(filePath, "utf-8").trim();
//   if (!fileContent) return {};

//   try {
//     const users = JSON.parse(fileContent);
//     return typeof users === "object" && !Array.isArray(users) ? users : {};
//   } catch {
//     return {};
//   }
// }

// const server = http.createServer((req, res) => {
//   res.setHeader("content-type", "application/json");

//   if (req.method === "POST" && req.url === "/user") {
//     let body = "";

//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });

//     req.on("end", () => {
//       let newUser;

//       try {
//         newUser = JSON.parse(body);
//       } catch {
//         res.writeHead(400);
//         return res.end(JSON.stringify({ error: "Invalid JSON body" }));
//       }

//       const users = readUsers();
//       const emailExists = Object.values(users).some((user) => user.email === newUser.email);

//       if (emailExists) {
//         res.writeHead(400);
//         return res.end(JSON.stringify({ message: "Email already exists." }));
//       }

//       users[newUser.id] = newUser;
//       fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

//       res.writeHead(201);
//       res.end(JSON.stringify({ message: "User added successfully." }));
//     });
//   } else {
//     res.writeHead(404);
//     res.end(JSON.stringify({ error: "not found" }));
//   }
// });

// server.listen(3000, () => {
//   console.log("connected on port 3000");
// });

//=====================================================================================================================================================

// 2 -

// const http = require("node:http")
// const fs = require("node:fs")


// const server = http.createServer((req,res)=>{

//   res.setHeader("content-type","application/JSON")
//   if (req.method == "PUT" && req.url=="/user" )
//   {
    
//     let body ="";
     
//     req.on("data",(chunk)=>{
//       body+= chunk
//     })
//     req.on("end",()=>{
//       const updatedUser = JSON.parse(body);
      
//       let users = JSON.parse(fs.readFileSync("./users.json"))
//      const target = updatedUser.id
//       if(!users[target])
//       {
//         res.writeHead(404);
        
//         return res.end(JSON.stringify({ message: "User not found." }))
//       }
//       users[target] = { ...users[target], ...updatedUser }
//       fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
//       res.writeHead(200);
//   res.end(JSON.stringify({ message: "User updated successfully." }));

  

//     })

    

//   }
//   else {
  
//     res.writeHead(404);
//     res.end(JSON.stringify({ message: "Route Not Found" }));
//   }
// })

// server.listen(3001,()=>{
//   console.log("connected");
// })


//================================================================================================================================================

// 3 - 

//  const http = require("node:http");
// const fs = require("node:fs");

// const server = http.createServer((req, res) => {
//   res.setHeader("content-type", "application/json");

  
//   if (req.method === "DELETE" && req.url.startsWith("/user/")) {
    
//         const targetId = req.url.split("/")[2];

//     let users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  
//     if (!targetId || !users[targetId]) {
//       res.writeHead(404);
//       return res.end(JSON.stringify({ message: "User ID not found." }));
//     }


//     delete users[targetId];
//     fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

//     res.writeHead(200);
//     res.end(JSON.stringify({ message: "User deleted successfully." }));

//   } else {
//     res.writeHead(404);
//     res.end(JSON.stringify({ message: "wrong route" }));
//   }
// });

// server.listen(3002, () => {
//   console.log("connected on port 3002");
// });
 
//====================================================================================================================================================

// 4 - 

// const http = require("node:http");
// const fs = require("node:fs");
// const server = http.createServer((req,res)=>
// {

//   if(req.method=="GET" && req.url=="/users")
//   {
//     res.setHeader("content-type", "application/json")
    
//     let data = fs.readFileSync("./users.json" , {encoding:"utf-8"})

//     res.end(data)
//   }

//   else
//     {
    
//       res.writeHead(404);
//         res.end(JSON.stringify({massage :"wrong request"}))

//   }

// })

// server.listen(3003,()=>{
// console.log("connected on port 3003");

// })
// ======================================================================================================================================================


// 5- 

// const http = require("node:http");
// const fs = require("node:fs");
// const server = http.createServer((req,res)=>
// {

//   if(req.method=="GET" && req.url.startsWith("/user/"))
//   {
//     const targetId = req.url.split("/")[2];
//     let users = JSON.parse(fs.readFileSync("./users.json", "utf-8"))
//     if(!targetId || !users[targetId])
//     {
//       res.writeHead(404);
//         res.end(JSON.stringify({message :"user not found"}))

//     }
//     res.writeHead(201)
//     res.end(JSON.stringify(users[targetId], null, 2));
//   }

//   else
//     {
    
//       res.writeHead(404);
//         res.end(JSON.stringify({massage :"wrong request"}))

//   }

// })

// server.listen(3004,()=>{
// console.log("connected on port 3004");
// })
