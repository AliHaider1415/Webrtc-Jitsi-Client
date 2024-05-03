import React from "react";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import url from "../../../utils/api";
import { toast } from "react-toastify";
import styles from "../../../utils/styles";
import QuestionResult from "../../../components/job-seeker-assesment/QuestionResult";

export default function ResultAssessmentPage() {
  let { id } = useParams();

  const fetchResult = async () => {
    try {
      const protocol = window.location.protocol;
      const response = await axios.get(
        `${protocol}//${url}/assessment/update-answers/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("No data received");
      }

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch assessment");
    }
  };

  const {
    isLoading,
    isError,
    data: result,
  } = useQuery({
    queryKey: ["result", id],
    queryFn: fetchResult,
  });

  if (isError) {
    toast.error("Failed to fetch assessment");
    console.log("Error");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Card
        className="p-4"
        style={{
          ...styles.HorizontalCardStyles,
          ...styles.assessmentModuleBackground,
        }}
      >
        <CardBody>
          <h1 className="fw-bold text-center mb-4" style={{ color: "#6c757d" }}>
            Result
          </h1>
          <h1
            className="text-center mb-4 fw-bold"
            style={styles.descriptionColor}
          >
            {result.assessment.title}
          </h1>
          <h4
            className="text-center mb-4 fw-bold"
            style={styles.secondaryButton}
          >
            You have scored {result.score}/{result.assessment.total_points}{" "}
            marks
          </h4>
          <Form>
            <FormGroup>
              <Row>
                <Col>
                  {result.assessment.questions.map((question, index) => (
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
