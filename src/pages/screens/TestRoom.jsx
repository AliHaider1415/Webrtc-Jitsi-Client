import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import peer from "../../service/peer";
import { useCallback } from "react";
import ReactPlayer from "react-player";
export default function TestRoom() {
  const { id } = useParams();
  const [remoteStream, setRemoteStream] = useState(null);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [incomingCall, setIncomingCall] = useState({ data: "", status: false });
  const [myStream, setMyStream] = useState(null);

  useEffect(() => {
    console.log("MSS", myStream);
  }, [myStream]);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `ws://127.0.0.1:8000/ws/video/${id}/`,
    {
      onOpen: () => console.log("Connected to the room"),

      onClose: () => console.log("Disconnected from the room"),
      onMessage: (message) => {
        console.log("Received message:", message);
        const parsedMessage = JSON.parse(message.data);
        if (parsedMessage.type === "offer") {
          console.log("call is coming");

          handleIncomingCall(parsedMessage);
        } else if (parsedMessage.type === "call:accepted") {
          console.log("paeen");
          handleCallAccepted(parsedMessage);
        }
      },
    }
  );

  const handleCallUser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);

      if (stream) {
        const offer = await peer.getOffer();
        sendJsonMessage({ type: "offer", offer });
      } else {
        console.error("Failed to get media stream");
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }, [sendJsonMessage]);

  const handleIncomingCall = useCallback(
    async (data) => {
      // const { from, offer } = data;
      const { offer } = data;
      console.log("object is sarm", offer);

      peer.setRemoteDescription(offer);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setMyStream(stream);
      // setRemoteSocketId(from);

      const answer = await peer.getAnswer(offer);

      // sendJsonMessage({ type: "answer",to: from,  answer });
      // sendJsonMessage({ type: "answer", answer });
      handleCallAccepted(answer);
    },

    [sendJsonMessage]
  );

  const handleUserJoined = useCallback(
    (data) => {
      const { roomId, userId } = data;
      console.log("User joined", userId);
      setRemoteSocketId(userId);

      // Send a message indicating user joining the room
      sendJsonMessage({ type: "user:joined", roomId, userId });
      console.log(sendJsonMessage);
    },
    [sendJsonMessage]
  );
  const sendStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      for (const track of stream.getTracks()) {
        console.log("hel");
        peer.peer.addTrack(track, stream);
        console.log("hel2");
      }
    } catch (error) {
      console.log(error);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async (offerData) => {
      console.log("offer", offerData);

      peer.setRemoteDescription(offerData);
      sendStream();
    },
    [sendStream]
  );

  const handleNegotiationNeeded = useCallback(async () => {
    const offer = await peer.getOffer();

    // Send the offer object to the peer via WebSocket
    sendJsonMessage({ type: "peer:nego:needed", offer, to: remoteSocketId });
  }, [sendJsonMessage, peer, remoteSocketId]);

  const handleNegotiationIncoming = useCallback(
    async (data) => {
      const { offer, from } = data;
      const ans = await peer.getAnswer(offer);

      // Send the answer object to the peer via WebSocket
      sendJsonMessage({ type: "peer:nego:done", to: from, ans });
    },
    [sendJsonMessage, peer]
  );

  const handleNegotiationFinal = useCallback((data) => {
    const { ans } = data;

    // Set the local description based on the received answer
    peer.setLocalDescription(ans);
  }, []);
  // useEffect(() => {
  //   console.log("negotiationneeded");
  //   peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
  //   return () => {
  //     peer.peer.removeEventListener(
  //       "negotiationneeded",
  //       handleNegotiationNeeded
  //     );
  //   };
  // }, []);
  // useEffect(() => {
  //   console.log("track");

  //   peer.peer.addEventListener("track", async (event) => {
  //     console.log("remote");
  //     const remoteStreams = event.streams;
  //     setRemoteStream(remoteStreams[0]);
  //   });
  // }, []);
  useEffect(() => {
    if (peer.peer) {
      console.log("negotiationneeded");
      peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
      return () => {
        peer.peer.removeEventListener(
          "negotiationneeded",
          handleNegotiationNeeded
        );
      };
    }
  }, [peer.peer, handleNegotiationNeeded]);

  useEffect(() => {
    if (peer.peer) {
      console.log("track");
      peer.peer.addEventListener("track", async (event) => {
        console.log("remote");
        const remoteStreams = event.streams;
        setRemoteStream(remoteStreams[0]);
      });
    }
  }, [peer.peer]);

  return (
    <div>
      <h4>
        {remoteSocketId
          ? `User ${remoteSocketId} has joined the room`
          : "Waiting for user to join"}
      </h4>
      {myStream && (
        <ReactPlayer
          playing
          muted
          controls
          width="100%"
          height="100%"
          url={myStream}
        />
      )}
      {remoteStream && (
        <ReactPlayer
          playing
          controls
          width="100%"
          height="100%"
          url={remoteStream}
        />
      )}
      <button onClick={handleCallUser}>Call</button>
      {myStream && <button onClick={sendStream}>Negotiate</button>}
    </div>
  );
}
