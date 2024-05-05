import React from "react";
import { Card, CardHeader, CardBody, CardText, Button } from "reactstrap";
import styles from "../../utils/styles";
import { Link } from "react-router-dom";

export default function AssessmentInfoBox({ assessment }) {
  return (
    <Card
      className="d-flex flex-row align-items-center my-2"
      style={styles.HorizontalCardStyles}
    >
      <div className="flex-grow-1">
        <CardHeader style={{ width: "200px", height: "105px" }}>
          <h5 style={{ marginBottom: "0" }}>
            {assessment.title.substring(0, 50)}
          </h5>
        </CardHeader>
        <CardBody>
          <CardText
            style={{
              fontSize: "14px",
              color: "#6c757d",
              height: "30px",
              width: "300px",
            }}
          >
            {assessment.description.substring(0, 100)}
          </CardText>
          <CardText
            className="fw-bold text-center"
            style={styles.secondaryButton}
          >
            Total Marks: {assessment.total_points}
          </CardText>
        </CardBody>
      </div>
      <div className="text-center">
        <Link to={`/company/view-assessments/${assessment.id}`}>
          <Button style={styles.primaryButton}>View your Assessment</Button>
        </Link>
      </div>
    </Card>
  );
}
