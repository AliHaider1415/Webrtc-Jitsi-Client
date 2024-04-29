import React, { useEffect, useState } from "react";
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
import Question from "../../../components/company-assessments/Question";
import { Formik, Form } from "formik";
import { AssessmentSchema } from "../../../utils/Schemas";
import { toast } from "react-toastify";
import styles from "../../../utils/styles";
import auth from "../../../utils/helper";
import url from "../../../utils/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateAssessmentForm() {
  const navigate = useNavigate();
  const createAssessment = useMutation({
    mutationFn: (values) => {
      const protocol = window.location.protocol;
      return axios.post(
        `${protocol}//${url}/assessment/create-assessment`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
        }
      );
    },
  });

  let enableEdit = false;
  //total marks state
  const [totalPoints, setTotalPoints] = useState(0);
  //question array
  const [questionsArray, setQuestionsArray] = useState([]);
  useEffect(() => {
    console.log(questionsArray);
  }, [questionsArray]);

  //handle create assessment

  const handleCreateAssessment = async (values) => {
    if (questionsArray.length === 0) {
      toast.error("Please add questions to the assessment");
      return;
    } else if (questionsArray.some((question) => question === null)) {
      toast.error("Please fill all the questions");
      return;
    }

    const response = await createAssessment.mutate({
      assessment: {
        title: values.title,
        description: values.description,
        total_points: totalPoints,
      },
      questions: questionsArray,
    });
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

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
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
          <Card style={styles.assessmentModuleBackground}>
            {createAssessment.isError &&
              toast.error("An error occurred while creating the assessment")}
            {createAssessment.isSuccess &&
              toast.success("Your assessment has been created successfully")}
            {createAssessment.isSuccess &&
              navigate("/company/company-assessments")}
            {createAssessment.isLoading && toast.info("Creating assessment")}
            <CardBody>
              <Form>
                <FormGroup>
                  <Row>
                    <Col>
                      <h1
                        className="text-center mb-4 fw-bold"
                        style={styles.descriptionColor}
                      >
                        Assessment Creation
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
                          <div style={styles.errorMessage}>{errors.title}</div>
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
                      disabled={createAssessment.isPending}
                    >
                      {createAssessment.isPending ? (
                        <>Submitting Assessmnent</>
                      ) : (
                        <>Submit Assessment</>
                      )}
                    </Button>
                  )}
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Container>
      )}
    </Formik>
  );
}
