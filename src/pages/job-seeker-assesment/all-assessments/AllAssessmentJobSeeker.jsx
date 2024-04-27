import React from "react";
import styles from "../../../utils/styles";
import AssessmentInfoBox from "../../../components/job-seeker-assesment/AssessmentInfoBox";
import { Container, Row, Col } from "reactstrap";
import assessments from "../../../utils/assessments";

export default function AllAssessmentJobSeeker() {
  return (
    <div>
      <h1 className="text-center fw-bold mt-2" style={styles.descriptionColor}>
        All My Assessments
      </h1>
      <Container className="text-center d-flex align-items-center">
        <Container className="d-flex justify-content-between flex-wrap  ">
          {assessments.map((assessment) => (
            <AssessmentInfoBox assessment={assessment} />
          ))}
        </Container>
      </Container>
    </div>
  );
}
