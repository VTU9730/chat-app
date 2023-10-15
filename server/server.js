const express=require("express")
const cors=require("cors")
const http=require("http")
const app=express()
app.use(cors())
const {Server} =require("socket.io")
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>")
})
io.on("connection",(socket)=>{
    console.log("User id: ",socket.id);

    socket.on("join_meet",(room)=>{
        socket.join(room)
        console.log(`User ${socket.id} has joined ${room}`);
    })
    socket.on("send_message",(message)=>{
        console.log(message);
        socket.broadcast.to(message.room).emit("receive",message)
    })
    socket.on("disconnect",()=>{
        console.log("user diconnected",socket.id);
    })
})
server.listen(4000,()=>{console.log("server listenng at 4000");})