import React from "react";
import styles from "../../../utils/styles";
import AssessmentInfoBox from "../../../components/job-seeker-assesment/AssessmentInfoBox";
import { Container, Row, Col } from "reactstrap";

export default function AllAssessmentJobSeeker() {
  let assessments = [
    {
      id: 1,
      title: "Assessment 1",
      description: "This is the first assessment",
      marks: 50,
    },
    {
      id: 2,
      title: "Assessment 2",
      description: "This is the second assessment",
      marks: 60,
    },
    {
      id: 3,
      title: "Assessment 3",
      description: "This is the third assessment",
      marks: 70,
    },
    {
      id: 4,
      title: "Assessment 4",
      description: "This is the fourth assessment",
      marks: 70,
    },
    {
      id: 5,
      title: "Assessment 4",
      description: "This is the fourth assessment",
      marks: 70,
    },
    {
      id: 6,
      title: "Assessment 4",
      description: "This is the fourth assessment",
      marks: 70,
    },
  ];
  return (
    <div>
      <h1 className="text-center fw-bold mt-2" style={styles.descriptionColor}>
        All My Assessments
      </h1>
      <Container className="text-center d-flex align-items-center">
        <Row className="">
          {assessments.map((assessment) => (
            <Col key={assessment.id} md={3} sm={6} xs={12}>
              <AssessmentInfoBox assessment={assessment} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
