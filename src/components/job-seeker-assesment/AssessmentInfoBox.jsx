import React from "react";
import { Card, CardHeader, CardBody, CardText, Button } from "reactstrap";
import styles from "../../utils/styles";
import { Link } from "react-router-dom";

export default function AssessmentInfoBox(props) {
  let assessment = props.assessment;
  return (
    <Card className="my-2" style={styles.CardStyles}>
      <CardHeader>
        <h5 style={{ marginBottom: "0" }}>{assessment.title}</h5>
      </CardHeader>
      <CardBody>
        <CardText style={{ fontSize: "14px", color: "#6c757d" }}>
          {assessment.description}
        </CardText>
        <CardText
          className="fw-bold text-center"
          style={styles.secondaryButton}
        >
          Total Marks: {assessment.marks}
        </CardText>
        <div className="text-center">
          <Link to={`/candidate/attempt-assessment/${assessment.id}`}>
            <Button style={styles.primaryButton}>Start Assessment</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
