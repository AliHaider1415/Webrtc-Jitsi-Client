import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import ReactPlayer from "react-player";
import { Button, Container, Row, Col, Card, CardBody } from "reactstrap";
import url from "../../utils/api";
import join from "../../utils/sounds/join.mp3";
import { toast } from "react-toastify";
import styles from "../../utils/styles";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CallIcon from "@mui/icons-material/Call";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function TestRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [myId, setMyId] = useState(null);
  const [myName, setMyName] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [iceCandidates, setIceCandidates] = useState({});
  const [requestedCall, setRequestedCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [onGoingCall, setOnGoingCall] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [currentParticipants, setCurrentParticipants] = useState([]);
  const peerConnections = useRef({});
  const [isScreenShared, setIsScreenShared] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  const timeUpdation = useMutation({
    mutationFn: (values) => {
      const protocol = window.location.protocol;
      return axios.put(
        `${protocol}//${url}/room/update-room/${id}/`,
        {
          room_data: {
            time_lapsed: values.time_lapsed,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
    },

    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(" success");
    },
  });

  const updateTime = async (time) => {
    await timeUpdation.mutate({
      time_lapsed: time,
    });
  };

  useEffect(() => {
    console.log("ishost", isHost);
  }, [isHost]);
  useEffect(() => {
    if (isHost && callDuration >= remainingTime * 60 && onGoingCall) {
      automaticEndCall();
    } else if (
      isHost &&
      remainingTime * 60 - callDuration === 60 &&
      onGoingCall
    ) {
      toast.error("You have 1 minute left");
    }
  }, [callDuration]);

  const automaticEndCall = () => {
    Object.values(peerConnections.current).forEach((peer) => peer.close());

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    setLocalStream(null);
    setRemoteStreams([]);
    setIncomingCall(null);
    setCallAccepted(false);
    setOnGoingCall(false);

    sendJsonMessage({
      type: "auto_end_call",
      sender_id: myId,
      sender_name: myName,
      time_lapsed: callDuration,
    });
    updateTime(Math.ceil(callDuration / 60));
    setCallDuration(0);
    console.log("I have closed connections");
    toast.error("The call has reached its time limit");
    navigate("/company/all-interviews");
  };

  useEffect(() => {
    let timer;
    if (onGoingCall) {
      timer = setInterval(() => {
        setCallDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else if (!onGoingCall && callDuration !== 0) {
      clearInterval(timer);

      console.log("The total Call duration is", Math.ceil(callDuration / 60));
    }
    return () => clearInterval(timer);
  }, [onGoingCall]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    sendJsonMessage({ type: "get_participants" });
  }, []);

  useEffect(() => {
    if (currentParticipants.length !== 0) {
      currentParticipants.forEach((peer) => {
        const peerConnection = new RTCPeerConnection(configuration);
        peerConnections.current[peer.peer_id] = peerConnection;

        peerConnection.ontrack = (event) => {
          console.log(
            `Received Track from Peer ${peer.peer_id}: `,
            event.streams[0]
          );
          setRemoteStreams((prev) => {
            const isStreamExist = prev.some(
              (test) => test.streaming.id === event.streams[0].id
            );
            if (!isStreamExist) {
              return [
                ...prev,
                {
                  streaming: event.streams[0],
                  peer_id: peer.peer_id,
                  peer_name: peer.peer_name,
                },
              ];
            }
            return prev;
          });
        };

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            console.log(
              `Sending ICE Candidate to Peer ${peer.peer_id}: `,
              event.candidate
            );
            sendJsonMessage({
              type: "ice_candidate",
              candidate: event.candidate,
              sender_id: myId,
              peer_id: peer.peer_id,
            });
          }
        };
      });
    }
  }, [myId, currentParticipants]);

  const addIceCandidates = async (peerId) => {
    iceCandidates[peerId].forEach(async (candidate) => {
      try {
        await peerConnections.current[peerId].addIceCandidate(candidate);
      } catch (error) {
        console.error("Error adding received ICE candidate", error);
      }
    });
  };

  useEffect(() => {
    console.log("Current Participants");
  }, [currentParticipants]);

  useEffect(() => {
    if (iceCandidates) {
      console.log("Ice Candidates: ", iceCandidates);
      Object.keys(iceCandidates).forEach((key) => {
        if (peerConnections.current[key].remoteDescription) {
          addIceCandidates(key);
        }
      });
    }
  }, [iceCandidates]);

  useEffect(() => {
    console.log("Remote Streams: ", remoteStreams);
  }, [remoteStreams]);

  const { sendJsonMessage } = useWebSocket(
    `ws://${url}/ws/video/${id}/?token=${localStorage.getItem("access")}`,
    {
      onOpen: () => console.log("Connected to the WebSocket Room"),
      onClose: () => console.log("Disconnected from WebSocket Room"),
      onMessage: async (message) => {
        const parsedMessage = JSON.parse(message.data);
        if (parsedMessage.error) {
          toast.error("Not Found");
          if (localStorage.getItem("user") === "JobSeeker") {
            navigate("/candidate/all-interviews");
          } else {
            navigate("/company/all-interviews");
          }
        }

        if (
          parsedMessage.type === "incoming_offer" &&
          parsedMessage.sender_id !== myId &&
          parsedMessage.peer_id === myId
        ) {
          setSenderId(parsedMessage.sender_id);
          setIncomingCall(parsedMessage.offer);
        } else if (parsedMessage.type === "get_participants") {
          setCurrentParticipants(parsedMessage.participants);
        } else if (parsedMessage.type === "incoming_offer") {
          setSenderId(parsedMessage.sender_id);
        } else if (parsedMessage.type === "connection_msg") {
          setMyId(parsedMessage.user_id);
          setMyName(parsedMessage.user_name);
          setIsHost(parsedMessage.is_host);
          setRemainingTime(parsedMessage.remaining_time);
        } else if (
          parsedMessage.type === "incoming_answer" &&
          parsedMessage.peer_id === myId
        ) {
          handleAcceptAnswer(parsedMessage.answer, parsedMessage.sender_id);
        } else if (
          parsedMessage.type === "peer_left" &&
          parsedMessage.sender_id !== myId
        ) {
          setRemoteStreams((prev) => {
            return prev.filter(
              (stream) => stream.userID !== parsedMessage.sender_id
            );
          });
          toast.error(`${parsedMessage.sender_name} has left the call`);
        } else if (
          parsedMessage.type === "incoming_ice_candidate" &&
          parsedMessage.sender_id !== myId &&
          parsedMessage.peer_id === myId
        ) {
          setIceCandidates((prev) => ({
            ...prev,
            [parsedMessage.sender_id]: [
              ...(prev[parsedMessage.sender_id] || []),
              parsedMessage.candidate,
            ],
          }));
        }
        if (parsedMessage.type === "host_left" && isHost) {
          updateTime(Math.ceil(parsedMessage.time_lapsed / 60));
        }
        if (
          parsedMessage.type === "host_left" &&
          !isHost &&
          parsedMessage.sender_id !== myId
        ) {
          Object.values(peerConnections.current).forEach((peer) =>
            peer.close()
          );

          if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
          }
          setLocalStream(null);
          setRemoteStreams([]);
          setIncomingCall(null);
          setCallAccepted(false);
          setOnGoingCall(false);
          toast.error(`Host has ended the call`);
        }

        if (parsedMessage.type === "auto_end_call" && !isHost) {
          Object.values(peerConnections.current).forEach((peer) =>
            peer.close()
          );

          if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
          }
          setLocalStream(null);
          setRemoteStreams([]);
          setIncomingCall(null);
          setCallAccepted(false);
          setOnGoingCall(false);
          navigate("/candidate/all-interviews");
        }
      },
    }
  );

  const handleAcceptCall = async () => {
    const localMediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(localMediaStream);

    setCallAccepted(true);
    setOnGoingCall(true);

    const peerConnection = peerConnections.current[senderId];
    localMediaStream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, localMediaStream));

    console.log(
      `Local Added Tracks For Peer ${senderId}: `,
      peerConnection.getSenders()
    );

    playRingingSound();
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(incomingCall)
    );
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    console.log(`Sending Answer to Peer ${senderId}: `, answer);
    sendJsonMessage({
      type: "answer",
      answer,
      sender_id: myId,
      peer_id: senderId,
    });
  };

  const handleAcceptAnswer = async (answer, sender_id) => {
    const peerConnection = peerConnections.current[sender_id];
    await peerConnection.setRemoteDescription(answer);
    console.log(
      `Remote Description for Peer ${sender_id}: `,
      peerConnection.remoteDescription
    );
    setRequestedCall(false);
    setOnGoingCall(true);
  };

  const playRingingSound = () => {
    const beat = new Audio(join);
    beat.play().catch((error) => {
      console.error("Failed to play ringing sound:", error);
    });
  };

  const createPeerConnection = async (peerId, localstream) => {
    const peerConnection = peerConnections.current[peerId];
    localstream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, localstream));

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log(`Sending Offer to Peer ${peerId}: `, offer);
    sendJsonMessage({ type: "offer", offer, sender_id: myId, peer_id: peerId });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(
          `Sending ICE Candidate to Peer ${peerId}: `,
          event.candidate
        );
        sendJsonMessage({
          type: "ice_candidate",
          candidate: event.candidate,
          sender_id: myId,
          peer_id: peerId,
        });
      }
    };
  };

  const handleCallUser = async () => {
    try {
      const localMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(localMediaStream);

      setRequestedCall(true);

      if (currentParticipants.length !== 0) {
        currentParticipants.forEach((peer) => {
          if (peer.peer_id !== myId) {
            createPeerConnection(peer.peer_id, localMediaStream);
          }
        });
      }
    } catch (error) {
      console.error(
        "Error accessing media devices or creating/sending offer",
        error
      );
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraEnabled(!isCameraEnabled);
    }
  };

  const toggleMicrophone = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicrophoneEnabled(!isMicrophoneEnabled);
    }
  };

  const handleScreenShare = async () => {
    try {
      if (!isScreenShared) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        setLocalStream(screenStream);
        setIsScreenShared(true);

        Object.values(peerConnections.current).forEach((peerConnection) => {
          const senders = peerConnection.getSenders();
          const videoSender = senders.find(
            (sender) => sender.track.kind === "video"
          );
          if (videoSender) {
            videoSender.replaceTrack(screenStream.getVideoTracks()[0]);
          } else {
            console.warn("No video sender found to replace track.");
          }
        });
      } else {
        const localMediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(localMediaStream);
        setIsScreenShared(false);

        Object.values(peerConnections.current).forEach((peerConnection) => {
          const senders = peerConnection.getSenders();
          const videoSender = senders.find(
            (sender) => sender.track.kind === "video"
          );
          if (videoSender) {
            videoSender.replaceTrack(localMediaStream.getVideoTracks()[0]);
          } else {
            console.warn("No video sender found to replace track.");
          }
        });
      }
    } catch (error) {
      console.error("Error accessing screen sharing:", error);
    }
  };

  const handleEndCall = () => {
    console.log("Call duration in end call", callDuration);
    Object.values(peerConnections.current).forEach((peer) => peer.close());

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    setLocalStream(null);
    setRemoteStreams([]);
    setIncomingCall(null);
    setCallAccepted(false);
    setOnGoingCall(false);
    if (!isHost) {
      sendJsonMessage({
        type: "peer_left",
        sender_id: myId,
        sender_name: myName,
      });
      toast.error("You left the call");
    }

    if (isHost) {
      sendJsonMessage({
        type: "host_left",
        sender_id: myId,
        sender_name: myName,
        time_lapsed: callDuration,
      });
      setCallDuration(0);
    }
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  return (
    <Container className="mt-4">
      <Card>
        <CardBody>
          <h4 className="text-center">
            {!remoteStreams.length
              ? "Waiting for user to join"
              : isReconnecting && remoteStreams.length
              ? "Reconnecting..."
              : "User connected"}
          </h4>
          {incomingCall && !callAccepted && (
            <>
              <h4 className="text-center">Incoming Call...</h4>
              <div className="text-center mb-4">
                <Button
                  color="success"
                  className="mt-2"
                  onClick={handleAcceptCall}
                >
                  Accept Call
                  <PhoneEnabledIcon className="mx-2 mb-1" />
                </Button>
              </div>
            </>
          )}
          <Row className="mt-4">
            {localStream && (
              <Col md={6} className="mb-4">
                <div className="card">
                  <ReactPlayer
                    playing
                    muted
                    controls
                    width="100%"
                    height="100%"
                    url={localStream}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Me</h5>
                  </div>
                </div>
              </Col>
            )}
            {remoteStreams.map((stream, index) => (
              <Col md={6} className="mb-4" key={index}>
                <div className="card">
                  <ReactPlayer
                    playing
                    controls
                    width="100%"
                    height="100%"
                    url={stream.streaming}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{stream.peer_name}</h5>
                  </div>
                </div>
              </Col>
            ))}
            {console.log("Remote Streams are here ", remoteStreams)}
          </Row>
          {onGoingCall && (
            <div className="text-center mt-4">
              <h5>Call Duration: {formatDuration(callDuration)}</h5>
            </div>
          )}
          <div className="text-center mt-4">
            {!requestedCall && !incomingCall && !onGoingCall && isHost && (
              <Button color="primary" onClick={handleCallUser}>
                <CallIcon className="mx-2" />
              </Button>
            )}
            {onGoingCall && (
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Button
                    color="danger"
                    className="my-2"
                    onClick={handleEndCall}
                  >
                    {isHost ? (
                      <CallEndIcon className="mx-2" />
                    ) : (
                      <ExitToAppIcon className="mx-2" />
                    )}
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    style={styles.secondaryButton}
                    onClick={toggleCamera}
                    className="my-2"
                  >
                    {isCameraEnabled ? (
                      <NoPhotographyIcon className="mx-2" />
                    ) : (
                      <CameraAltIcon className="mx-2" />
                    )}
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    color="secondary"
                    onClick={toggleMicrophone}
                    className="my-2"
                  >
                    {isMicrophoneEnabled ? (
                      <MicOffIcon className="mx-2" />
                    ) : (
                      <KeyboardVoiceIcon className="mx-2" />
                    )}
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    style={styles.primaryButton}
                    onClick={handleScreenShare}
                    className="my-2"
                  >
                    {isScreenShared ? (
                      <StopScreenShareIcon className="mx-2" />
                    ) : (
                      <ScreenShareIcon className="mx-2" />
                    )}
                  </Button>
                </Col>
              </Row>
            )}
          </div>
          {requestedCall && <h4 className="text-center">Call is ongoing</h4>}
        </CardBody>
      </Card>
    </Container>
  );
}