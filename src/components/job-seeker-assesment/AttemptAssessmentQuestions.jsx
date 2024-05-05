import React, { useEffect } from "react";
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
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import url from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AttemptAssessmentQuestions(props) {
  let { assessment } = props;
  const navigate = useNavigate();
  const initialAnswers = assessment.questions.map((question) => ({
    question: question.id,
    answer_text: "",
  }));
  const [answers, setAnswers] = useState(initialAnswers);
  const addAnswers = (values) => {
    const newAnswers = answers.map((ans) => {
      if (ans.question === values.question) {
        return { ...ans, answer_text: values.answer_text };
      }
      return ans;
    });
    setAnswers(newAnswers);
  };

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const submitAnswers = useMutation({
    mutationFn: (values) => {
      console.log(values);
      const protocol = window.location.protocol;
      return axios.post(
        `${protocol}//${url}/assessment/create-answers`,
        {
          assessment_pk: values.assessment_pk,
          answers: values.answers,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      setTimeout(() => {
        navigate(`/candidate/result-assessments/${assessment.id}`);
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.log(error);
    },
  });
  const submitAssessment = () => {
    const isAnyAnswerEmpty = answers.some(
      (answer) => answer.answer_text.trim() === ""
    );
    if (isAnyAnswerEmpty) {
      return toast.error(
        "Please provide an answer for all questions before submitting."
      );
    }
    submitAnswers.mutate({ answers: answers, assessment_pk: assessment.id });
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
                      d
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
