import React, { useRef, useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import styles from "../../utils/styles";

export default function Room() {
  const [stream, setStream] = useState(null);
  const videoRef1 = useRef();
  const videoRef2 = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef1.current) {
          videoRef1.current.srcObject = mediaStream;
        }
        if (videoRef2.current) {
          videoRef2.current.srcObject = mediaStream;
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div>
      <div>
        <h1
          className="text-center fw-bold mt-2"
          style={styles.descriptionColor}
        >
          Call Page
        </h1>
        <Container
          className="d-flex justify-content-center"
          style={{
            ...styles.HorizontalCardStyles,
            ...styles.assessmentModuleBackground,
          }}
        >
          <Row>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <div style={{ position: "relative" }}>
                <video
                  ref={videoRef1}
                  autoPlay
                  muted
                  style={{ height: "400px", width: "300px" }}
                />
                <h5
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  MSS{" "}
                </h5>
              </div>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <div style={{ position: "relative" }}>
                <video
                  ref={videoRef2}
                  autoPlay
                  muted
                  style={{ height: "400px", width: "300px" }}
                />
                <h5
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  Ali Haider
                </h5>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
