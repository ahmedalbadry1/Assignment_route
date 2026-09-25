//=======================================================Assignment3==============================================================


//=======================================================part1==============================================================

// 1 -it is a loop and the core mechanism that enables Node.js to perform non-blocking asynchronous operations using a single thread to process code execution


// 2 -Libuv is an open-source C library that powers asynchronous in Node.js
// It is responsible for managing the Event Loop and handling heavy background operations (like file system access and cryptography) 
// using a Thread Pool of 4 background threads


// 3 - Node.js handles async operations through these main steps:

// Call Stack Execution: Synchronous code runs first on the main thread in the Call Stack. When an async operation (like fs.readFile or setTimeout) is encountered, it is sent to Libuv.

// Background Processing: Libuv offloads network tasks directly to the OS Kernel and heavy tasks (like file I/O or crypto) to its Thread Pool

// Callback Queue: Once the background task finishes its callback function is pushed to the Callback Queue

// Event Loop: The Event Loop checks if the Call Stack is empty. As soon as it clears then it moves the callback from the queue to the Call Stack to be executed



// 4 - Call Stack: Executes synchronous JavaScript code line-by-line It keeps track of the currently executing functions 

// Event Queue : Stores callback functions from completed asynchronous operations (like fs.readFile or setTimeout) in a  First In, First Out order waiting to be executed

// Event Loop: The background mechanism that continuously monitors both the Call Stack and the Event Queue When the Call Stack is completely empty it takes the first callback from the Event Queue and pushes it onto the Call Stack for execution



// 5 - they are 4 vertual threads by defullt that are manged using libuv in the background they are used to handel file system operations 
// to change the number of threads we use ($env:UV_THREADPOOL_SIZE=8) in the terminal


// 6 - Blocking Code Execution (Synchronous):

// Runs directly on the main single thread inside the Call Stack.

// Executes line-by-line, stopping (blocking) all further code execution until the current operation finishes.

// Example: fs.readFileSync() or heavy for loops.

// Non-Blocking Code Execution (Asynchronous):

// Offloads the operation to Libuv (the OS kernel or the Thread Pool) so the main thread remains free.

// Node.js registers a callback and immediately continues executing the rest of the code.

// Once the task completes in the background, its callback goes to the Event Queue, and the Event Loop pushes it to the Call Stack when empty.

// Example: fs.readFile() or setTimeout().




//=======================================================part2==============================================================

// 1 - 

// const express= require("express")
// const app = express()
// const port = 3000
// const fs = require("node:fs")

// app.use(express.json())

// app.post("/user",(req,res,next)=>{
//     const { id, name, age, email } = req.body;

//   if (!id || !name || !email) {
//     return res.status(400).json({ message: "id, name, and email are required" });
//   }
//   const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

//   if (users[id])
//   {
//     return res.status(404).json({massage:"id already exists"})
//   }

//   const emailExists = Object.values(users).some((user)=>user.email===email)
//   if(emailExists){
//     return res.status(404).json({massage:"email already exists"})
//   }
//   users[id] = { id, name, age, email };
//   fs.writeFileSync("./users.json",JSON.stringify(users, null, 2))
  
// return res.status(201).json({
//     message: "User added successfully",
//     user: users[id] })
// })

// app.use((err,req,res,next)=>

// {
//     console.log(err)
//     res.status(500).json({massage:"unexpectes eror"})
// })

// app.listen(port,()=>{console.log(`conected on ${port}`)} )

//=================================================================================================================================================

// 2-
// const express= require("express")
// const app = express()
// const port = 3001
// const fs = require("node:fs")


// app.use(express.json())

// app.patch("/user/:id",(req,res,next)=>{

// const { id } = req.params;
//     const { name, age, email } = req.body;

//     const users = JSON.parse(fs.readFileSync("./users.json" , {encoding : "utf-8"}))
//    if (!users[id]) {
//       return res.status(404).json({ message: "User ID not found." });
//     }

//    if (name !== undefined) users[id].name = name;
//     if (age !== undefined) users[id].age = age;
//     if (email !== undefined) users[id].email = email;
//     fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

//      return res.status(200).json({ message: "User updated successfully." });
    
    

    
// })


// app.use((err,req,res,next)=>

// {
//     console.log(err)
//     res.status(500).json({massage:"unexpectes eror"})
// })

// app.listen(port,()=>{console.log(`conected on ${port}`)} )

//=================================================================================================================================================

// 3 - 

// const express= require("express")
// const app = express()
// const port = 3002
// const fs = require("node:fs")


// app.use(express.json())

// app.delete("/user{/:id}",(req,res,next)=>{

// const  id  = req.params.id || req.body.id

// if (!id) {
//       return res.status(400).json({ message: "User ID is required." });
//     }

// const users = JSON.parse(fs.readFileSync("./users.json","utf-8"))

// if (!users[id]) {
//       return res.status(404).json({ message: "User ID not found." });
//     }

// delete users[id];
// fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

// return res.status(201).json({massage : "deleted"})

// })


// app.use((err,req,res,next)=>

// {
//     console.log(err)
//     res.status(500).json({massage:"unexpectes eror"})
// })

// app.listen(port,()=>{console.log(`conected on ${port}`)} )

//=================================================================================================================================================

// 4-

// const express = require("express")
// const fs = require("fs")

// const app = express()
// const port = 3003

// app.use(express.json())

// app.get("/user/getByName",(req,res,next)=>{

//     const name=req.query.name

//     const users = JSON.parse(fs.readFileSync("./users.json","utf-8"))

//     const userName = Object.values(users).find((user) => user.name === name);

//     if(!userName)
//     {
//         return res.status(404).json({massage:"not found"})
//     }

//     res.status(201).json(userName)

// }
// )

// app.use((err,req,res,next)=>{
//     console.log (err)
//     return res.status(505).json({massage:"unexpected eror"})
// })

// app.listen(port,()=>
// {
//     console.log(`connected on port ${port}`)

// })

// =================================================================================================================================================

//5-
// const express = require("express")
// const fs = require("fs")

// const port = 3005
// const app = express()

// app.use(express.json())

// app.get("/user",(req,res,next)=>{

//     const users = JSON.parse(fs.readFileSync("./users.json","utf-8"))
//     return res.status(200).json(users)
// })


// app.use((err,req,res,next)=>{
//     console.log(err)
//     return res.status(500).json({massage:"un expected eror"})
// })

// app.listen(port,()=>
// {
//     console.log(`connected on port ${port}`)
// })




// =================================================================================================================================================

//6-

// const express = require("express")
// const fs = require("fs")

// const port = 3006
// const app = express()

// app.use(express.json())

// app.get("/user/filter",(req,res,next)=>{

//     const {minAge} = req.query
//     const users = JSON.parse(fs.readFileSync("./users.json","utf-8"))
//     const usersArray = Object.values(users).filter((user)=> user.age >=minAge)
    
//     if(usersArray.length===0)
//     {
//         return res.status(404).json({massage:"not found"})
//     }

//     return res.status(200).json(usersArray)
    
// })


// app.use((err,req,res,next)=>{
//     console.log(err)
//     return res.status(500).json({massage:"un expected eror"})
// })

// app.listen(port,()=>
// {
//     console.log(`connected on port ${port}`)
// })


// =================================================================================================================================================

// 7-

// const express = require("express")
// const fs = require("fs")

// const app = express()
// const port = 3004

// app.use(express.json())

// app.get("/user/:id",(req,res,next)=>{

//     const id =req.params.id
  
//     if(!id)
//     {
//         return res.status(404).json({massage:"user not found"})
//     }

//     const users = JSON.parse(fs.readFileSync("./users.json","utf-8"))

    

//     if(!users[id])
//     {
//         return res.status(404).json({massage:"not found"})
//     }
 
//     res.status(201).json(users[id])

// }
// )

// app.use((err,req,res,next)=>{
//     console.log (err)
//     return res.status(505).json({massage:"unexpected eror"})
// })

// app.listen(port,()=>
// {
//     console.log(`connected on port ${port}`)

// })
