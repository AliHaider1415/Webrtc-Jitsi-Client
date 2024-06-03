// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useWebSocket from "react-use-websocket";
// import peer from "../../service/peer";
// import { useCallback } from "react";
// import ReactPlayer from "react-player";
// export default function TestRoom() {
// const { id } = useParams();
// const [remoteStream, setRemoteStream] = useState(null);
// const [remoteSocketId, setRemoteSocketId] = useState(null);
// const [myStream, setMyStream] = useState(null);

//   useEffect(() => {
//     console.log("MSS is here", myStream);
//   }, [myStream]);

//   const { sendJsonMessage, lastJsonMessage } = useWebSocket(
//     `ws://127.0.0.1:8000/ws/video/${id}/`,
//     {
//       onOpen: () => console.log("Connected to the room"),

//       onClose: () => console.log("Disconnected from the room"),
//       onMessage: (message) => {
//         console.log("Received message:", message);
//         const parsedMessage = JSON.parse(message.data);
//         if (parsedMessage.type === "offer") {
//           handleIncomingCall(parsedMessage);
//         } else if (parsedMessage.type === "answer") {
//           console.log("paeen");
//           handleCallAccepted(parsedMessage);
//         } else if (parsedMessage.type === "peer:nego:needed") {
//           handleNegotiationIncoming(parsedMessage);
//         } else if (parsedMessage.type === "peer:nego:done") {
//           handleNegotiationFinal(parsedMessage);
//         } else if (parsedMessage.type === "user:joined") {
//           handleUserJoined(parsedMessage);
//         }
//       },
//     }
//   );

//   const handleCallUser = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setMyStream(stream);

//       if (stream) {
//         const offer = await peer.getOffer();
//         sendJsonMessage({ type: "offer", offer });
//       } else {
//         console.error("Failed to get media stream");
//       }a
//     } catch (error) {
//       console.error("Error accessing media devices.", error);
//     }
//   };
//   const handleIncomingCall = async (data) => {
//     const { offer } = data;

//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     setMyStream(stream);

//     peer.setRemoteDescription(offer);

//     const answer = await peer.getAnswer(offer);

//     sendJsonMessage({ type: "answer", answer });
//   };

//   const handleUserJoined = useCallback(
//     (data) => {
//       const { roomId, userId } = data;
//       console.log("User joined", userId);
//       setRemoteSocketId(userId);

//       // Send a message indicating user joining the room
//       sendJsonMessage({ type: "user:joined", roomId, userId });
//       console.log(sendJsonMessage);
//     },
//     [sendJsonMessage]
//   );
//   const sendStream = async () => {
//     try {
//       for (const track of myStream.getTracks()) {
//         if (!peer.peer.getSenders().find((sender) => sender.track === track)) {
//           peer.peer.addTrack(track, myStream);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

// const handleCallAccepted = async (offerData) => {
//   console.log("call is accepted");
//   console.log("offer", offerData);

//   try {
//     await peer.setRemoteDescription(offerData);
//     sendStream();
//   } catch (error) {
//     console.error("Error setting remote description:", error);
//   }
// };
// const handleNegotiationNeeded = async () => {
//   const offer = await peer.getOffer();

//   // Send the offer object to the peer via WebSocket
//   sendJsonMessage({ type: "peer:nego:needed", offer });
//   handleNegotiationIncoming(offer);
// };

//   const handleNegotiationIncoming = async (data) => {
//     console.log(data);
//     const ans = await peer.getAnswer(data);

//     sendJsonMessage({ type: "peer:nego:done", ans });
//     handleNegotiationFinal(ans);
//   };
//   const handleNegotiationFinal = (data) => {
//     const { ans } = data;
//   };

//   useEffect(() => {
//     if (peer.peer) {
//       console.log("negotiationneeded");
//       peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
//       return () => {
//         peer.peer.removeEventListener(
//           "negotiationneeded",
//           handleNegotiationNeeded
//         );
//       };
//     }
//   }, [peer.peer, handleNegotiationNeeded]);

//   useEffect(() => {
//     if (peer.peer) {
//       console.log("track");
//       peer.peer.addEventListener("track", async (event) => {
//         console.log("remote");
//         const remoteStreams = event.streams;
//         setRemoteStream(remoteStreams[0]);
//       });
//     }
//   }, [peer.peer]);

//   return (
//     <div>
//       <h4>
//         {remoteSocketId
//           ? `User ${remoteSocketId} has joined the room`
//           : "Waiting for user to join"}
//       </h4>
//       {myStream && (
//         <ReactPlayer
//           playing
//           muted
//           controls
//           width="50%"
//           height="50%"
//           url={myStream}
//         />
//       )}
//       {remoteStream && (
//         <ReactPlayer
//           playing
//           controls
//           width="50%"
//           height="50%"
//           url={remoteStream}
//         />
//       )}
//       {myStream && console.log("My stream MSS", myStream)}

//       {remoteStream && console.log("Remote stream MSS", remoteStream)}

//       <button onClick={handleCallUser}>Call</button>
//       {myStream && <button onClick={sendStream}>Negotiate</button>}
//     </div>
//   );
// }

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
          setIncomingCall(parsedMessage.offer);
        } else if (parsedMessage.type === "connection_msg") {
          setMyId(parsedMessage.user_id);
        } else if (parsedMessage.type === "answer") {
          peer.setRemoteDescription(parsedMessage.answer);
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
  };

  const handleAcceptCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
      peer.setRemoteDescription(incomingCall);
      const answer = await peer.getAnswer(incomingCall);
      sendJsonMessage({ type: "answer", answer });
    } catch (error) {
      console.error("Error accepting call", error);
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
