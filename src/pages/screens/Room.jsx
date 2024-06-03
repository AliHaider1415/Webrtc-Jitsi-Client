import React, { useRef, useState, useEffect } from "react";
import { Container, Col, Row, Button } from "reactstrap";
import styles from "../../utils/styles";

export default function Room() {
  const [stream, setStream] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const videoRef = useRef();

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    getMediaStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);
      }
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div>
      <h1 className="text-center fw-bold mt-2" style={styles.descriptionColor}>
        Call Page
      </h1>
      <Container
        className="d-flex flex-column align-items-center"
        style={{
          ...styles.HorizontalCardStyles,
          ...styles.assessmentModuleBackground,
        }}
      >
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              height: "400px",
              width: "400px",
              backgroundColor: "black",
            }}
          />
          <h5
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
            }}
          >
            MSS
          </h5>
        </div>
        <Row className="justify-content-center">
          <Col xs="auto" className="d-flex justify-content-center mb-2">
            <Button onClick={toggleVideo} style={styles.primaryButton}>
              {isVideoEnabled ? "Disable Video" : "Enable Video"}
            </Button>
          </Col>
          <Col xs="auto" className="d-flex justify-content-center mb-2">
            <Button onClick={toggleAudio} style={styles.primaryButton}>
              {isAudioEnabled ? "Disable Audio" : "Enable Audio"}
            </Button>
          </Col>
          <Col xs="auto" className="d-flex justify-content-center mb-2">
            <Button
              onClick={endCall}
              style={styles.primaryButton}
              color="danger"
            >
              End Call
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
