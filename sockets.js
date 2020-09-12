module.exports = function(io){
  io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
      console.log(roomId, userId);
      socket.join(roomId);
      socket.to(roomId).broadcast.emit("user-connected", userId);

      socket.on("disconnect", () => {
        socket.to(roomId).broadcast.emit("user-disconneted", userId);
      });
    });
  });
}
