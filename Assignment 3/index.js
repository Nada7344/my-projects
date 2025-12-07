const path = require('node:path')
const fs = require('node:fs')
const http = require('node:http')
const { createGzip } = require('node:zlib')
const filePath = path.resolve('./big.txt')
const destfilePath = path.resolve('./dest.txt')
const destzipfile = path.resolve('./file.txt.gz')
const zip = createGzip();
let port = 3000;

//Part1:-

//Q1:-
// const readStream =fs.createReadStream(filePath,{encoding:'utf-8',highWaterMark:64});
// readStream.on('data',(chunk)=>{
//     console.log("==============================================================");
//     console.log(chunk);
//     console.log("==============================================================");

// })
// readStream.on('end',()=>{
//     console.log("end of stream");
// })

// readStream.on('error', (err) => {
//     console.error('Error:', err.message);
//   });

//Q2:-
// function copyContent(source,dest) {
// const readableStream =fs.createReadStream(source,{encoding:'utf-8'});
// const writableStream=fs.createWriteStream(dest);
// readableStream.pipe(writableStream);
// writableStream.on('finish',()=>{
//     console.log("File copied using streams");

// })
// readableStream.on('error',(error)=>{
//     console.log(error);

// })
// writableStream.on('error',(error)=>{
//     console.log(error);

// })

// }
// copyContent(filePath,destfilePath);

//Q3:-
// function compressesFile(source,dest) {
// const readableStream =fs.createReadStream(source,{encoding:'utf-8'});
// const writableStream=fs.createWriteStream(dest);
// readableStream.pipe(zip).pipe(writableStream);
// writableStream.on('finish',()=>{
//     console.log("File compressesed successfully");

// })
// readableStream.on('error',(error)=>{
//     console.log(error);

// })
// writableStream.on('error',(error)=>{
//     console.log(error);

// })

// }
// compressesFile(filePath,destzipfile);


//part2:-
// const usersFile = path.resolve('./users.json')
// function allUsers() {
//   if (!fs.existsSync(usersFile)) {
//     fs.writeFileSync(usersFile, JSON.stringify([]));
//   }
//   const users = fs.readFileSync(usersFile, { encoding: 'utf-8' })
//   return JSON.parse(users);
// }
// function writeUsers(users) {
//   fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
// }

// const srever = http.createServer((req, res) => {
//   const { url, method } = req;
//   let userid = (url).split('/')[2];
//   console.log(userid);
//   console.log({ url, method });
//   if (url === '/user' && method === 'POST') {
//     let user = '';
//     req.on('data', (chunk) => {
//       user += chunk;
//     });
//     req.on('end', () => {
//       const newUer = JSON.parse(user);
//       const { email } = JSON.parse(user);
//       console.log({ email });
//       let users = allUsers();
//       let checkUserExist = users.find((ele) => ele.email === email)

//       if (checkUserExist) {
//         res.writeHead(401, { "Content-Type": "application/json" });
//         res.write(JSON.stringify({ message: "Email already exists." }));
//         res.end();

//       }
//       else {
//         users.push(newUer);
//         writeUsers(users);
//         res.writeHead(201, { "Content-Type": "application/json" });
//         res.write(JSON.stringify({ message: "User added successfully." }));
//         res.end();
//       }

//     });


//   } else if (url === `/user/${userid}` && method === 'DELETE') {

//     let users = allUsers();
//     let flag = false;
//     console.log(users);
//     const usersLength = users.length;


//     let newUsers = users.filter((user) => {

//       return user.id !== parseInt(userid)

//     });
//     console.log(newUsers);

//     if (usersLength === newUsers.length) {
//       res.writeHead(401, { "Content-Type": "application/json" });
//       res.write(JSON.stringify({ message: "user id not found." }));
//       res.end();
//     } else {
//       writeUsers(newUsers);
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.write(JSON.stringify({ message: "User deleted successfully." }));
//       res.end();
//     }

//   } else if (url === `/user/${userid}` && method === 'PATCH') {
    
//     let user = "";

//     req.on("data", chunk => {
//       user += chunk;
//     });


//    req.on("end", () => {
//     const updatedData = JSON.parse(user);
//     let users = allUsers();
//     let flag = false;
//     console.log(users);

//     const updatedUsers = users.map((user) => {
//       console.log(userid);

//      if (user.id == userid) {
//           flag = true;

//           user.name = updatedData.name ?? user.name;
//           user.age = updatedData.age ?? user.age;
//           user.email = updatedData.email ?? user.email;
//         }
//         return user;
//     })

//     if (!flag) {
//       res.writeHead(401, { "Content-Type": "application/json" });
//       res.write(JSON.stringify({ message: "user id not found." }));
//       res.end();

//     }
//     else {

//       writeUsers(updatedUsers);
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.write(JSON.stringify({ message: "User updated successfully." }));
//       res.end();
//     }

//   });

//   } else if (url === '/user' && method === 'GET') {

//     let users = allUsers();

//     console.log(users);


//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify(users));
//     res.end();


//   } else if (url === `/user/${userid}` && method === 'GET') {

//     let users = allUsers();
//     console.log(users);

//     let myuser = users.find((user) => user.id == userid);
//     console.log(myuser);

//     if (!myuser) {
//       res.writeHead(401, { "Content-Type": "application/json" });
//       res.write(JSON.stringify({ message: "user doesnt exist." }));
//       res.end();
//     } else {

//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.write(JSON.stringify(myuser));
//       res.end();
//     }
//   } else {
//     res.writeHead(404, { 'content-type': 'text/plain' })
//     res.end("invalid routing")
//   }

// })

// function listen() {
//   return srever.listen(port, '127.0.0.1', () => {
//     console.log(`servr running on port  ${port}`);

//   })

// }
// listen();
// srever.on("error", (error) => {
//   console.log(error);

// })

//part3:-
/*
1. What is the Node.js Event Loop? 
Answer:-The event loop
JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events, 
and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.
=================================================================================================================================================================================================
2. What is Libuv and What Role Does It Play in Node.js? 
libuv : This is a C library that specializes in handling asynchronous I/O (Input/Output) operations. 
It manages a thread pool and an event loop to handle tasks in the background without blocking JavaScript’s main thread.
=================================================================================================================================================================================================

3. How Does Node.js Handle Asynchronous Operations Under the Hood? 
Node.js handles asynchronous operations under the hood using a combination of its Event Loop, the libuv library, and the underlying operating system's kernel.
When you call an async function :

Your JS code registers the async task.

libuv handles it:

I/O operations go to the OS (non-blocking).

Heavy operations go to the thread pool.

When the operation finishes, libuv sends the callback back to the event loop.

The event loop executes your callback when its phase is ready.

Promises and async/await run in the microtask queue, which runs between event loop phases.
=================================================================================================================================================================================================

4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? 

1-Call Stack:The place where JavaScript code runs,Executes functions one at a time (LIFO: last in, first out),If a function is running, the stack is busy.
2-Event Queue (Callback Queue):Stores callbacks from completed async tasks ( timers).
When the call stack becomes empty, the event loop moves the next callback into the stack.
3-Event Loop:The controller that keeps checking:
Is the call stack empty?
Are there callbacks in the event queue?
If the stack is empty, it pushes queued callbacks into it.
Repeats this process forever → making async behavior possible.
=================================================================================================================================================================================================

5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? 

The Node.js Thread Pool is a group of background threads managed by libuv that executes operations which cannot be performed non-blocking at the OS level. 
Although Node.js runs JavaScript on a single thread, many asynchronous operations—such as file system operations, 
DNS lookups, encryption (crypto), and compression (zlib)—are offloaded to this thread pool so the event loop remains responsive.

By default, the thread pool contains 4 threads,we can change the thread pool size by setting the environment variable UV_THREADPOOL_SIZE before starting Node.js:
$env:UV_THREADPOOL_SIZE=8;

=================================================================================================================================================================================================

6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? 
1-Blocking Code:-
Runs synchronously on the call stack,Node.js waits until the operation finishes.
Blocks the event loop → no other code runs meanwhile.


2-Non-Blocking Code:-
Runs asynchronously,The operation is sent to libuv (thread pool or OS I/O).
Node.js does not wait—it continues executing other code.
When the task finishes, its callback is put in the event queue, and the event loop runs it.

Blocking code stays on the main thread and stops everything.
Non-blocking code is offloaded (to OS or thread pool), letting Node serve many requests efficiently.

*/ 