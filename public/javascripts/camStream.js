var video = document.querySelector("#video");
function startVideo() {
  console.log(video);
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
}
// function startVideo(){
//     navigator.getUserMedia(
//         {video: {}},
//         stream => video.srcObject = stream,
//         err => console.error(err)
//     )
// }
startVideo();

// https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm
