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
        <CardText
          style={{ fontSize: "14px", color: "#6c757d", height: "60px" }}
        >
          {assessment.description.substring(0, 100)}
        </CardText>
        <CardText
          className="fw-bold text-center"
          style={styles.secondaryButton}
        >
          Total Marks: {assessment.total_points}
        </CardText>
        <div className="text-center">
          <Link to={`/company/view-assessments/${assessment.id}`}>
            <Button style={styles.primaryButton}>View your Assessment</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
