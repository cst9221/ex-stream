const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const indexRouter = require("./routes/index");
const roomRouter = require("./routes/room");

app.set('io', io)
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/room", roomRouter);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => { // join-room요청?이 왔을때
    console.log('server.js io.on : room - ',roomId,'| user - ', userId);
    socket.join(roomId); // room 접속
    socket.to(roomId).broadcast.emit("user-connected", userId); // 자신을 제외한 user들에게

    socket.on("disconnect", () => { // 연결이 끊겼을 때
      socket.to(roomId).broadcast.emit("user-disconneted", userId);
    });
  }); 
});

server.listen(3000, ()=>{
  console.log('port 3000 open')
});

// https://www.youtube.com/watch?v=DvlyzDZDEq4&t=440s