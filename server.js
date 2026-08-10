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
// Rate llimiter code block {#f08,5}
const limiter=rateLimiter({
    windowMs:10*60*1000,
    max:10,
    message:"Too many requests"
})
// app.use(limiter)
app.use(express.static(path.join(__dirname, "public")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})
const port = process.env.PORT
const server = http.createServer(app);
// SERVER LITSENER CODE BLOCK {#a9c,3}
server.listen(port, () => {
    console.log(`SERVER RUNNING`)
})
// WEB SOCKET DEMONISTRATING CODE BLOCK

// Initialize Socket.io with CORS enabled for your frontend
// SOCKET CORS CODE BLOCK {#a2c,6}
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let activeUsersCount = 0;

// SOCKET IO CONNECTION INITIATER CODE BLOCK {#c57,13}
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

  // SOCKET IO DISCONNECTION HANDLER {#efc,5}
  socket.on('disconnect', () => {
    activeUsersCount = Math.max(0, activeUsersCount - 1);
    io.emit('user_count', activeUsersCount);
  });
});


