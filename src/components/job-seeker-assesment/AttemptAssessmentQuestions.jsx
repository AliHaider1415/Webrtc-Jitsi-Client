import React from "react";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Button,
} from "reactstrap";
import QuestionAttempt from "./QuestionAttempt";
import styles from "../../utils/styles";
export default function AttemptAssessmentQuestions(props) {
  let { assessment, submitAssessment, addAnswers } = props;

  return (
    <Container className="mt-5">
      <Card style={styles.assessmentModuleBackground}>
        <CardBody>
          <Form>
            <FormGroup>
              <Row>
                <Col>
                  <h1
                    className="text-center mb-4 fw-bold"
                    style={styles.descriptionColor}
                  >
                    {assessment.title}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="text-center" style={styles.descriptionColor}>
                    {assessment.description}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4
                    className="text-center fw-bold"
                    style={styles.secondaryButton}
                  >
                    Total Marks: {assessment.total_points}
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  {assessment.questions.map((question, index) => (
                    <QuestionAttempt
                      question={question}
                      index={index}
                      key={question.id}
                      addAnswers={addAnswers}
                    />
                  ))}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    style={styles.primaryButton}
                    onClick={submitAssessment}
                  >
                    Submit Assessment
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
