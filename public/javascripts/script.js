const socket = io("/");
const videoGrid = document.getElementById("video-grid");

const myPeer = new Peer(undefined)
// const myPeer = new Peer(undefined, {
//   host: "/",
//   port: "3001",
// });
const myVideo = document.createElement("video");
myVideo.muted = true;
const peers = {};

// 클라이언트사용자의 mediaDevices를 가져옴
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: false,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    console.log('asdf : ', myPeer);
    myPeer.on("call", (call) => {
      console.log("asdffff");
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });
socket.on("user-disconneted", (userId) => {
  if (peers[userId]) peers[userId].close();
});
myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

// socket.emit('join-room', ROOM_ID, 10)

socket.on("user-connected", (userId) => {
  console.log("User connected : ", userId);
});

function connectToNewUser(userId, stream) {
  console.log("connecttonewuser");
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
  console.log('call',call)
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}
