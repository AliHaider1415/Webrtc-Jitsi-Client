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
import styles from "../../utils/styles";
import QuestionResult from "./QuestionResult";

export default function ResultAssessmentQuestions(props) {
  let { result } = props;
  return (
    <Container className="mt-5">
      <Card style={styles.assessmentModuleBackground}>
        <CardBody>
          <Form>
            <FormGroup>
              <Row>
                <h1
                  style={{ color: "#6c757d" }}
                  className="fw-bold text-center"
                >
                  Result
                </h1>
              </Row>
              <Row>
                <Col>
                  <h1
                    className="text-center mb-4 fw-bold"
                    style={styles.descriptionColor}
                  >
                    {result.title}
                  </h1>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h4
                    className="text-center fw-bold"
                    style={styles.secondaryButton}
                  >
                    You have scored {result.obtained_points}/
                    {result.total_points} marks
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  {result.questions.map((question, index) => (
                    <QuestionResult
                      question={question}
                      index={index}
                      key={question.id}
                    />
                  ))}
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
