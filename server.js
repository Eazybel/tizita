const express=require("express")
const path=require("path")
const rateLimiter=require("express-rate-limit")
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require("dotenv").config()
const app=express()
app.use(cors());
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
const limiter=rateLimiter({
    windowMs:15*60*1000,
    max:3,
    message:"Too many requests"
})
// app.use(limiter)
app.use(express.static(path.join(__dirname, "public")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})
const port = process.env.PORT
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`SERVER RUNNING`)
})
// WEB SOCKET DEMONISTRATING CODE BLOCK

// Initialize Socket.io with CORS enabled for your frontend
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let activeUsersCount = 0;

io.on('connection', (socket) => {
  activeUsersCount++;
  io.emit('user_count', activeUsersCount);

  // Receive message and relay senderName
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', {
      text: data.text,
      senderName: data.senderName || 'Anonymous',
      senderId: socket.id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('disconnect', () => {
    activeUsersCount = Math.max(0, activeUsersCount - 1);
    io.emit('user_count', activeUsersCount);
  });
});


