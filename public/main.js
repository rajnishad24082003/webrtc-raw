const callbtn = document.getElementById("call");
callbtn.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(async (stream) => {
      const localvideo = document.getElementById("local");
      localvideo.srcObject = stream;
      const stunServer = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };

      const rtcClient = new RTCPeerConnection(stunServer);
      rtcClient.addTrack(stream.getTracks()[0], stream); //audio
      rtcClient.addTrack(stream.getTracks()[1], stream); //video

      const localSDP = await rtcClient.createOffer();
      const remoteSDP = "asume be have that here";

      rtcClient.setLocalDescription(localSDP);
      rtcClient.setRemoteDescription(remoteSDP);
    });
});

const ansbtn = document.getElementById("ans");
callbtn.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(async (stream) => {
      const localvideo = document.getElementById("local");
      localvideo.srcObject = stream;
      const stunServer = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };

      const rtcClient = new RTCPeerConnection(stunServer);
      rtcClient.addTrack(stream.getTracks()[0], stream); //audio
      rtcClient.addTrack(stream.getTracks()[1], stream); //video

      const localSDP = await rtcClient.createOffer();
      const remoteSDP = "asume be have that here";

      rtcClient.setLocalDescription(localSDP);
      rtcClient.setRemoteDescription(remoteSDP);
    });
});
