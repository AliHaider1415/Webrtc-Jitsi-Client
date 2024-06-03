import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import peer from "../../service/peer";
import ReactPlayer from "react-player";
import { Button } from "reactstrap";

export default function TestRoom() {
  const { id } = useParams();
  const [remoteStream, setRemoteStream] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [myId, setMyId] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [senderId, setSenderId] = useState(null);
  useEffect(() => {
    console.log(myId);
  }, [myId]);
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
          console.log(parsedMessage.offer);

          setIncomingCall(parsedMessage.offer);
        } else if (parsedMessage.type === "incoming_offer") {
          setSenderId(parsedMessage.sender_id);
        } else if (parsedMessage.type === "connection_msg") {
          setMyId(parsedMessage.user_id);
        } else if (
          parsedMessage.type === "incoming_answer" &&
          senderId === myId
        ) {
          console.log("Incoming answer paeen", parsedMessage.answer);
        }
      },
    }
  );

  useEffect(() => {
    if (peer.peer) {
      peer.peer.ontrack = (event) => {
        const [stream] = event.streams;
        setRemoteStream(stream);
      };
    }

    return () => {
      // Clean up media stream and peer connection
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
      if (peer.peer) {
        peer.peer.close();
      }
    };
  }, [myStream]);

  const handleCallUser = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const offer = await peer.getOffer();
      setMyStream(stream);

      console.log("mss ali ", offer);
      sendJsonMessage({ type: "offer", offer });
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const handleAcceptCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("incoming", incomingCall);
      const answer = await peer.getAnswer(incomingCall);
      console.log("herllo hamza", answer);
      setMyStream(stream);
      sendJsonMessage({ type: "answer", answer });
    } catch (error) {
      console.error("Error accepting call", error);
    }
  };

  const sendStream = async () => {
    try {
      for (const track of myStream.getTracks()) {
        if (!peer.peer.getSenders().find((sender) => sender.track === track)) {
          peer.peer.addTrack(track, myStream);
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
