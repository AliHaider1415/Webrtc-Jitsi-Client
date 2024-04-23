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

export default function CreateAssessmentForm() {
  const [totalPoints, setTotalPoints] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);

  const handleCreateAssessment = (values) => {
    if (questionsArray.length === 0) {
      toast.error("Please add questions to the assessment");
    }
    console.log(values.title, values.description, totalPoints, questionsArray);
  };

  const addQuestion = (index, question) => {
    const updatedQuestionsArray = [...questionsArray];
    console.log(question.question_point);
    setTotalPoints((prev) => prev + question.question_point);
    updatedQuestionsArray[index] = question;
    setQuestionsArray(updatedQuestionsArray);
  };

  useEffect(() => {
    console.log(questionsArray);
  }, [questionsArray]);

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
        setFieldValue,
      }) => (
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
                      className="mx-3 mt-2"
                      onClick={handleSubmit}
                      style={styles.primaryButton}
                    >
                      Submit Assessment
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
