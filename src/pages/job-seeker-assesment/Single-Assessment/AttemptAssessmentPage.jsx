import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../../utils/styles";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import QuestionAttempt from "../../../components/job-seeker-assesment/QuestionAttempt";
export default function AttemptAssessmentPage() {
  const [answers, setAnswers] = useState([]);

  const addAnswers = (answer, index) => {
    let updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
    console.log(answers);
  };

  const { id } = useParams();
  let assessment = {
    id: 8,
    questions: [
      {
        id: 1,
        options: [
          { id: 1, option_text: "Sarmad" },
          { id: 2, option_text: "MSS" },
          { id: 3, option_text: "Good" },
        ],
        question_desc:
          "dnkjwdqiohwhr3uewnfwhfuewbfuewfghjwfbuyidwquiyqwbdjjsfbejfhejbjwbhwgf7eg?",
        question_type: "MCQ",
        question_point: 2,
        number_of_options: 3,
        answer_text: "",
        assessment: 8,
      },
      {
        id: 2,
        options: [
          { id: 1, option_text: "True" },
          { id: 2, option_text: "False" },
        ],
        question_desc:
          "dnkjwdqiohwhr3uewnfwhfuewbfuewfghjwfbuyidwquiyqwbdjjsfbejfhejbjwbhwgf7eg?",
        question_type: "True Or False",
        question_point: 2,
        number_of_options: 2,
        answer_text: "",
        assessment: 8,
      },
      {
        id: 3,
        options: [],
        question_desc:
          "dnkjwdqiohwhr3uewnfwhfuewbfuewfghjwfbuyidwquiyqwbdjjsfbejfhejbjwbhwgf7eg?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text: "",
        assessment: 8,
      },
    ],
    title: "Bulk Assessment",
    description: "This is a sample assessment",
    total_points: 20,
    company: 1,
  };

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
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
