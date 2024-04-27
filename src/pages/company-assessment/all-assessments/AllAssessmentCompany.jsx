import React from "react";
import styles from "../../../utils/styles";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import assessments from "../../../utils/assessments";
import AssessmentInfoBox from "../../../components/company-assessments/AssessmentInfoBox";
export default function AllAssessmentCompany() {
  return (
    <div>
      <h1 className="text-center fw-bold mt-2" style={styles.descriptionColor}>
        Assessments under your Company
      </h1>
      <Link
        to="/company/create-assessment"
        className="d-flex justify-content-center"
      >
        <Button style={styles.primaryButton}>Create new Assessment</Button>
      </Link>
      <Container className="d-flex justify-content-between flex-wrap  ">
        {assessments.map((assessment) => (
          <AssessmentInfoBox assessment={assessment} />
        ))}
      </Container>
    </div>
  );
}
