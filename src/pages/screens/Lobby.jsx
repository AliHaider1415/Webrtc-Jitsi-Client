import React from "react";

export default function Lobby() {
  return <div></div>;
}
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import useWebSocket, { readyState } from "react-use-websocket";

// export default function TestRoom() {
//   const { id } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const { sendJsonMessage, readyState } = useWebSocket(
//     `ws://127.0.0.1:8000/ws/video/${id}/`,
//     {
//       onOpen: () => {
//         console.log("Connected!");
//       },
//       onClose: () => {
//         console.log("Disconnected!");
//       },
//       onMessage: (e) => {
//         const message = JSON.parse(e.data);
//         setMessages((prevMessages) => [...prevMessages, message]);
//       },
//     }
//   );

//   const testmsg = (type) => {
//     sendJsonMessage({
//       type: type,
//       offer: {
//         message: message,
//         authToken: localStorage.getItem("user"),
//       },
//     });
//     console.log("Message sent");
//   };

//   return (
//     <div>
//       <div>Room ID: {id}</div>
//       <div>
//         <button onClick={() => testmsg("offer")}>Send Offer</button>
//       </div>

//       <input
//         type="text"
//         name="message"
//         value={message}
//         onChange={handleChange}
//       />
//       <div>
//         <h3>Messages:</h3>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{JSON.stringify(msg)}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

//   // import React, { useState, useEffect } from "react";
//   // import { useParams } from "react-router-dom";
//   // import useWebSocket from "react-use-websocket";

//   // export default function TestRoom() {
//   //   const { id } = useParams();
//   //   const [localStream, setLocalStream] = useState(null);
//   //   const [remoteStream, setRemoteStream] = useState(null);
//   //   const [peerConnection, setPeerConnection] = useState(null);
//   //   const { sendJsonMessage, lastMessage } = useWebSocket(
//   //     `ws://127.0.0.1:8000/ws/video/${id}/`
//   //   );

//   //   useEffect(() => {
//   //     // Function to initialize local media stream
//   //     const initWebRTC = async () => {
//   //       try {
//   //         const stream = await navigator.mediaDevices.getUserMedia({
//   //           video: true,
//   //           audio: true,
//   //         });
//   //         setLocalStream(stream);
//   //       } catch (error) {
//   //         console.error("Error accessing media devices:", error);
//   //       }
//   //     };

//   //     // Call the function to initialize local media stream
//   //     initWebRTC();

//   //     // Cleanup function to stop tracks when component unmounts
//   //     return () => {
//   //       if (localStream) {
//   //         localStream.getTracks().forEach((track) => track.stop());
//   //       }
//   //     };
//   //   }, []);

//   //   useEffect(() => {
//   //     // Function to initialize peer connection
//   //     const initPeerConnection = () => {
//   //       const pc = new RTCPeerConnection();
//   //       // Set up event listeners for ICE candidates and incoming media streams
//   //       pc.onicecandidate = handleICECandidateEvent;
//   //       pc.ontrack = handleTrackEvent;
//   //       // Add local tracks to the peer connection
//   //       if (localStream) {
//   //         localStream
//   //           .getTracks()
//   //           .forEach((track) => pc.addTrack(track, localStream));
//   //       }
//   //       // Set the peer connection in state
//   //       setPeerConnection(pc);
//   //     };

//   //     // Call the function to initialize peer connection
//   //     if (localStream) {
//   //       initPeerConnection();
//   //     }
//   //   }, [localStream]);

//   //   // Effect to handle incoming signaling messages
//   //   useEffect(() => {
//   //     if (lastMessage) {
//   //       const message = JSON.parse(lastMessage.data);
//   //       if (message.type === "offer") {
//   //         handleReceiveOffer(message.offer);
//   //       } else if (message.type === "answer") {
//   //         handleReceiveAnswer(message.answer);
//   //       } else if (message.type === "ice-candidate") {
//   //         handleReceiveICECandidate(message.candidate);
//   //       }
//   //     }
//   //   }, [lastMessage]);

//   //   // Function to handle ICE candidates
//   //   const handleICECandidateEvent = (event) => {
//   //     if (event.candidate) {
//   //       sendJsonMessage({ type: "ice-candidate", candidate: event.candidate });
//   //     }
//   //   };

//   //   // Function to handle incoming media streams
//   //   const handleTrackEvent = (event) => {
//   //     setRemoteStream(event.streams[0]);
//   //   };

//   //   // Function to handle receiving an offer
//   //   const handleReceiveOffer = async (offer) => {
//   //     await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//   //     const answer = await peerConnection.createAnswer();
//   //     await peerConnection.setLocalDescription(answer);
//   //     sendJsonMessage({ type: "answer", answer });
//   //   };

//   //   // Function to handle receiving an answer
//   //   const handleReceiveAnswer = async (answer) => {
//   //     await peerConnection.setRemoteDescription(
//   //       new RTCSessionDescription(answer)
//   //     );
//   //   };

//   //   // Function to handle receiving an ICE candidate
//   //   const handleReceiveICECandidate = async (candidate) => {
//   //     await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//   //   };

//   //   // Render the component
//   //   return (
//   //     <div>
//   //       <div>
//   //         <h3>Local Stream</h3>
//   //         {localStream && (
//   //           <video
//   //             autoPlay
//   //             ref={(video) => {
//   //               if (video) video.srcObject = localStream;
//   //             }}
//   //           />
//   //         )}
//   //       </div>
//   //       <div>
//   //         <h3>Remote Stream</h3>
//   //         {remoteStream && (
//   //           <video
//   //             autoPlay
//   //             ref={(video) => {
//   //               if (video) video.srcObject = remoteStream;
//   //             }}
//   //           />
//   //         )}
//   //       </div>
//   //     </div>
//   //   );
//   // }

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import useWebSocket from "react-use-websocket";

// export default function TestRoom() {
//   const { id } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   useEffect(() => {
//     // Initialize WebRTC
//     const initializeWebRTC = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setLocalStream(stream);
//       localVideoRef.current.srcObject = stream;
//     };

//     initializeWebRTC();

//     // Clean up function
//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }
//       if (remoteStream) {
//         remoteStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!peerConnection) return;

//     const handleIceCandidate = (event) => {
//       if (event.candidate) {
//         sendMessage({ type: "candidate", candidate: event.candidate });
//       }
//     };

//     peerConnection.onicecandidate = handleIceCandidate;

//     const handleTrack = (event) => {
//       setRemoteStream(event.streams[0]);
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     peerConnection.ontrack = handleTrack;

//     return () => {
//       peerConnection.onicecandidate = null;
//       peerConnection.ontrack = null;
//     };
//   }, [peerConnection]);

//   const handleChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const { sendJsonMessage } = useWebSocket(
//     `ws://127.0.0.1:8000/ws/video/${id}/`,
//     {
//       onMessage: (e) => {
//         const message = JSON.parse(e.data);
//         handleMessage(message);
//       },
//     }
//   );

//   const handleMessage = async (message) => {
//     if (message.type === "offer") {
//       const pc = new RTCPeerConnection();
//       setPeerConnection(pc);
//       localStream
//         .getTracks()
//         .forEach((track) => pc.addTrack(track, localStream));
//       await pc.setRemoteDescription(new RTCSessionDescription(message.offer));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       sendMessage({ type: "answer", answer: pc.localDescription });
//     } else if (message.type === "answer") {
//       await peerConnection.setRemoteDescription(
//         new RTCSessionDescription(message.answer)
//       );
//     } else if (message.type === "candidate") {
//       await peerConnection.addIceCandidate(
//         new RTCIceCandidate(message.candidate)
//       );
//     }
//   };

//   const sendMessage = (message) => {
//     sendJsonMessage(message);
//   };

//   const startCall = async () => {
//     const pc = new RTCPeerConnection();
//     setPeerConnection(pc);
//     localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);
//     sendMessage({ type: "offer", offer: pc.localDescription });
//   };

//   return (
//     <div>
//       <div>Room ID: {id}</div>
//       <div>
//         <button onClick={startCall}>Start Call</button>
//       </div>

//       <video ref={localVideoRef} autoPlay playsInline muted />
//       <video ref={remoteVideoRef} autoPlay playsInline />

//       <div>
//         <input
//           type="text"
//           name="message"
//           value={message}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <h3>Messages:</h3>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{JSON.stringify(msg)}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
