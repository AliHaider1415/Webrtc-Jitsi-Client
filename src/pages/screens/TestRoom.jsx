import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import ReactPlayer from "react-player";
import { Button } from "reactstrap";

export default function TestRoom() {
  const { id } = useParams();
  const [remoteStream, setRemoteStream] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [myId, setMyId] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [senderId, setSenderId] = useState(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `ws://127.0.0.1:8000/ws/video/${id}/?token=${localStorage.getItem(
      "access"
    )}`,
    {
      onOpen: () => console.log("Connected to the room"),
      onClose: () => console.log("Disconnected from the room"),
      onMessage: (message) => {
        console.log("Received message:", message);

        const parsedMessage = JSON.parse(message.data);
        if (
          parsedMessage.type === "incoming_offer" &&
          parsedMessage.sender_id !== myId
        ) {
          setSenderId(parsedMessage.sender_id);
          // console.log(parsedMessage.offer);
          setIncomingCall(parsedMessage.offer);
        } else if (parsedMessage.type === "incoming_offer") {
          setSenderId(parsedMessage.sender_id);
        } else if (parsedMessage.type === "connection_msg") {
          setMyId(parsedMessage.user_id);
        } else if (
          parsedMessage.type === "incoming_answer" &&
          senderId === myId
        ) {
          handleAcceptAnswer(parsedMessage.answer);
        }
      },
    }
  );

  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  const peer = new RTCPeerConnection(configuration);

  useEffect(() => {
    if (peer) {
      peer.ontrack = (event) => {
        const [stream] = event.streams;
        setRemoteStream(stream);
      };
    }

    return () => {
      // Clean up media stream and peer connection
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
      if (peer) {
        peer.close();
      }
    };
  }, [myStream]);

  const handleAcceptAnswer = async (answer) => {
    if (peer.signalingState !== "closed") {
      peer
        .setRemoteDescription(answer)
        .catch((error) => console.error("Error accepting answer", error));

      console.log(
        " answer:::Ye remote description hai",
        peer.remoteDescription
      );
    } else {
      console.log("connection is cloesed");
    }
  };

  const handleCallUser = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setMyStream(stream);

      for (const track of stream.getTracks()) {
        peer.addTrack(track);
      }
      // console.log("peer", peer);
      const offer = await peer.createOffer();

      // console.log("after create offer here");

      await peer.setLocalDescription(offer);
      console.log("localDesc", peer.localDescription);

      // Listen for local ICE candidates on the local RTCPeerConnection
      peer.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          // signalingChannel.send({'new-ice-candidate': event.candidate});
          console.log("New ICE candidate", event.candidate);
        }
      });

      // console.log("Ye local description hai", peer.peer.localDescription);
      // console.log("stream tracks:", stream.getTracks());

      // console.log("mss ali ", offer);

      sendJsonMessage({ type: "offer", offer });
    } catch (error) {
      console.log("Error accessing media devices.", error);
    }
  };

  const handleAcceptCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      // console.log("incoming", incomingCall);
      const answer = await peer.createAnswer(incomingCall);
      peer.setRemoteDescription(incomingCall);
      // console.log("Ye remote description hai", peer.peer.remoteDescription);
      setMyStream(stream);
      peer.setLocalDescription(answer);
      console.log("ans:ye local description hai", peer.localDescription);
      sendJsonMessage({ type: "answer", answer });
    } catch (error) {
      console.error("Error accepting call", error);
    }
  };

  const sendStream = async () => {
    try {
      for (const track of myStream.getTracks()) {
        if (!peer.getSenders().find((sender) => sender.track === track)) {
          peer.addTrack(track, myStream);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4>{remoteStream ? `User connected` : "Waiting for user to join"}</h4>

      {incomingCall && <h4>Incoming Call</h4>}

      {incomingCall && <Button onClick={handleAcceptCall}>Accept Call</Button>}
      {myStream && (
        <ReactPlayer
          playing
          muted
          controls
          width="50%"
          height="50%"
          url={myStream}
        />
      )}
      {remoteStream && (
        <ReactPlayer
          playing
          controls
          width="50%"
          height="50%"
          url={remoteStream}
        />
      )}

      <button onClick={handleCallUser}>Call</button>
    </div>
  );
}
