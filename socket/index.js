const http=require("http");
const express=require("express");
const app=express();
const server=http.createServer(app);
const path=require("path");
const { Server } = require("socket.io");
const io=new Server(server);

//socket.io//2
io.on("connection", (socket) => {
  socket.on("user-msg",(message)=>{
    console.log("A new User message: ",message);
    io.emit("message",message);
  })

});


app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.sendFile("index.html");
})

server.listen(9000,()=>{
    console.log("server is listening on port 9000");
})
