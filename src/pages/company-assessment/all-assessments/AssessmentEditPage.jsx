import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../../../components/company-assessments/Question";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { Formik, Form } from "formik";
import { AssessmentSchema } from "../../../utils/Schemas";
import { toast } from "react-toastify";
import styles from "../../../utils/styles";
import { useQuery } from "@tanstack/react-query";
import url from "../../../utils/api";

export default function EditAssessmentPage() {
  const { id } = useParams();
  let enableEdit = true;

  let i =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MjQwNTg2LCJpYXQiOjE3MTQyMzY5ODYsImp0aSI6IjRjNzUwY2JkMmY4MzRlMzc5MmQxM2RjYWJjMDMwYzQ0IiwidXNlcl9pZCI6N30.m9aXhRJESRcVa7NHx5cCDqgQgds49NcYwWaCauKzVnI";

  //fetching data
  const {
    isPending,
    error,
    data: assessment,
  } = useQuery({
    queryKey: ["assessment"],
    queryFn: async () => {
      const protocol = window.location.protocol;
      const response = await fetch(
        `${protocol}//${url}/assessment/update-assessment/${id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer  ${i}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch assessments");
      }
      return response.json();
    },
  });
  // if (isPending) return <div> Loading...</div>;

  // if (error) return <div>An error has occurred: {error.message}</div>;

  //handle create assessment
  const handleCreateAssessment = (values) => {
    console.log(values.title, values.description, totalPoints, questionsArray);
    if (questionsArray.length === 0) {
      toast.error("Please add questions to the assessment");
    } else if (questionsArray.some((question) => question === null)) {
      toast.error("Please fill all the questions");
    }
  };

  //add question
  const addQuestion = (index, question) => {
    const updatedQuestionsArray = [...questionsArray];
    console.log(question.question_point);
    setTotalPoints((prev) => prev + question.question_point);
    updatedQuestionsArray[index] = question;
    setQuestionsArray(updatedQuestionsArray);
  };

  //remove question
  const removeQuestion = (indexToRemove) => {
    const updatedQuestionsArray = [...questionsArray];
    const removedQuestion = updatedQuestionsArray[indexToRemove];
    console.log(removedQuestion);
    if (removedQuestion && removedQuestion.question_point) {
      setTotalPoints((prev) => prev - removedQuestion.question_point);
    }
    updatedQuestionsArray.splice(indexToRemove, 1);
    setQuestionsArray(updatedQuestionsArray);
  };

  const [totalPoints, setTotalPoints] = useState(0);

  // question array
  const [questionsArray, setQuestionsArray] = useState([]);

  return (
    <>
      {!isPending ? (
        <Formik
          initialValues={{
            title: assessment ? assessment[0].title : "",
            description: assessment ? assessment[0].description : "",
          }}
          validationSchema={AssessmentSchema}
          onSubmit={(values) => {
            handleCreateAssessment(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Container className="mt-5">
              {setQuestionsArray(assessment[0].questions)}
              {console.log("tp", assessment[0].total_points)}

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
                            Edit your assessment
                          </h1>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col md={3}>
                          <div>
                            <Label
                              for="assessmentTitle"
                              style={styles.descriptionColor}
                            >
                              Assessment Title
                            </Label>
                            <Input
                              type="text"
                              placeholder="Enter assessment title"
                              name="title"
                              value={values.title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={
                                errors.title && touched.title
                                  ? styles.error
                                  : styles.input
                              }
                            />
                            {errors.title && touched.title && (
                              <div style={styles.errorMessage}>
                                {errors.title}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col md={9}>
                          <div>
                            <Label style={styles.descriptionColor}>
                              Assessment Description
                            </Label>
                            <Input
                              id="exampleText"
                              name="description"
                              placeholder="Write Description"
                              type="text"
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={
                                errors.description && touched.description
                                  ? styles.error
                                  : styles.input
                              }
                            />
                            {errors.description && touched.description && (
                              <div style={styles.errorMessage}>
                                {errors.description}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {questionsArray.map((question, index) => (
                            <Question
                              key={index}
                              index={index}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              enableEdit={enableEdit}
                              question={question}
                              addQuestion={addQuestion}
                              removeQuestion={() => removeQuestion(index)}
                            />
                          ))}
                        </Col>
                      </Row>
                      <Button
                        style={styles.primaryButton}
                        className="mt-2"
                        onClick={() => {
                          setQuestionsArray([...questionsArray, null]);
                        }}
                      >
                        Add Question
                      </Button>

                      {questionsArray.length > 0 && (
                        <Button
                          className="mx-1 mt-2"
                          onClick={handleSubmit}
                          style={styles.primaryButton}
                        >
                          Save the Changes
                        </Button>
                      )}
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Container>
          )}
        </Formik>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
