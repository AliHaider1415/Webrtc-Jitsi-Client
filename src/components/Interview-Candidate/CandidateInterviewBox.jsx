import React from "react";
import { Card, CardBody, CardHeader, CardText, Button } from "reactstrap";
import styles from "../../utils/styles";
export default function CandidateInterviewBox() {
  return (
    <Card
      className="d-flex flex-row align-items-center my-2"
      style={styles.HorizontalCardStyles}
    >
      <div className="flex-grow-1">
        <CardHeader style={{ width: "200px", height: "105px" }}>
          <h5 style={{ marginBottom: "0" }}>Interview Title</h5>
        </CardHeader>
        <CardBody>
          ``
          <CardText
            style={{
              fontSize: "14px",
              color: "#6c757d",
              height: "30px",
              width: "300px",
            }}
          ></CardText>
          <CardText
            className="fw-bold text-center"
            style={styles.descriptionColor}
          >
            By Company :9
          </CardText>
        </CardBody>
      </div>
      <div className="text-center">
        <Button style={styles.primaryButton}>Start Interview</Button>
      </div>
    </Card>
  );
}
