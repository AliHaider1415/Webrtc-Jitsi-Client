import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import ReactPlayer from "react-player";
import { Button } from "reactstrap";

export default function TestRoom() {
  const { id } = useParams();
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [myId, setMyId] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [iceCandidates, setIceCandidates] = useState([]);
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  const peer = useRef(new RTCPeerConnection(configuration)).current;

  useEffect(() => {
    if (peer.remoteDescription) {
      addIceCandidates();
    }
  }, [peer.remoteDescription]);

  useEffect(() => {
    console.log("Peer Connection State: ", peer.connectionState);
  }, [peer.connectionState]);

  const addIceCandidates = () => {
    iceCandidates.forEach(async (candidate) => {
      try {
        await peer.addIceCandidate(candidate);
      } catch (error) {
        console.error("Error adding received ICE candidate", error);
      }
    });
  };

  useEffect(() => {
    console.log("Ice Connection State", peer.iceConnectionState);
  }, [peer.iceConnectionState]);

  const { sendJsonMessage } = useWebSocket(
    `ws://127.0.0.1:8000/ws/video/${id}/?token=${localStorage.getItem("access")}`,
    {
      onOpen: () => console.log("Connected to the WebSocket Room"),
      onClose: () => console.log("Disconnected from WebSocket Room"),
      onMessage: async (message) => {
        const parsedMessage = JSON.parse(message.data);
        if (parsedMessage.type === "incoming_offer" && parsedMessage.sender_id !== myId) {
          setSenderId(parsedMessage.sender_id);
          setIncomingCall(parsedMessage.offer);
        } else if (parsedMessage.type === "incoming_offer") {
          setSenderId(parsedMessage.sender_id);
        } else if (parsedMessage.type === "connection_msg") {
          setMyId(parsedMessage.user_id);
        } else if (parsedMessage.type === "incoming_answer" && senderId === myId) {
          await handleAcceptAnswer(parsedMessage.answer);
        } else if (parsedMessage.type === "incoming_ice_candidate" && parsedMessage.sender_id !== myId) {
          setIceCandidates([...iceCandidates, parsedMessage.candidate]);
        }
      },
    }
  );

  const handleAcceptAnswer = async (answer) => {
    try {
      if (peer.signalingState === "have-local-offer") {
        const remoteDesc = new RTCSessionDescription(answer);
        await peer.setRemoteDescription(remoteDesc);
      } else {
        console.log("Peer connection is not in the correct state to accept an answer.");
      }
    } catch (error) {
      console.error("Error setting remote description on answer", error);
    }
  };

  const handleCallUser = async () => {
    try {
      const localMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localMediaStream.getTracks().forEach(track => {
        peer.addTrack(track, localMediaStream);
      });
      console.log("Local Tracks of Sender: ", peer.getSenders());

      setLocalStream(localMediaStream);

      peer.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      sendJsonMessage({ type: "offer", offer, sender_id: myId });

      peer.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          sendJsonMessage({
            type: "ice_candidate",
            candidate: event.candidate,
            sender_id: myId,
          });
        }
      });

      console.log("Successful HandleCallUser");
    } catch (error) {
      console.error("Error creating or sending offer", error);
    }
  };

  const handleAcceptCall = async () => {
    try {
      const localMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localMediaStream.getTracks().forEach(track => {
        peer.addTrack(track, localMediaStream);
      });
      console.log("Local Tracks of Receiver: ", peer.getSenders());

      setLocalStream(localMediaStream);

      peer.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      if (peer.signalingState === "stable" || peer.signalingState === "have-remote-offer") {
        await peer.setRemoteDescription(new RTCSessionDescription(incomingCall));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        sendJsonMessage({ type: "answer", answer, sender_id: myId });

        peer.addEventListener("icecandidate", (event) => {
          if (event.candidate) {
            sendJsonMessage({
              type: "ice_candidate",
              candidate: event.candidate,
              sender_id: myId,
            });
          }
        });

        console.log("Successful HandleCallUser");
      } else {
        console.error("Peer connection is not in the correct state to accept a call.");
      }
    } catch (error) {
      console.log("Error accepting call", error);
    }
  };

  return (
    <div>
      <h4>{remoteStream ? "User connected" : "Waiting for user to join"}</h4>
      {incomingCall && <h4>Incoming Call</h4>}
      {incomingCall && <Button onClick={handleAcceptCall}>Accept Call</Button>}
      {localStream && (
        <ReactPlayer
          playing
          muted
          controls
          width="50%" 
          height="50%"
          url={localStream}
        />
      )}
      {localStream && console.log(localStream)}
      {remoteStream && (
        <ReactPlayer
          playing
          controls
          width="50%"
          height="50%"
          url={remoteStream}
        />
      )}

      {remoteStream && console.log(remoteStream)}
      <Button onClick={handleCallUser}>Call</Button>
    </div>
  );
}
