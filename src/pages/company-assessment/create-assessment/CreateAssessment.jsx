import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Question from "../../../components/company-assessments/Question";
import { Formik, Form } from "formik";
import { AssessmentSchema } from "../../../utils/Schemas";
import { toast } from "react-toastify";
import styles from "../../../utils/styles";

export default function CreateAssessmentForm() {
  let totalPoints = 0;
  const [questionsArray, setQuestionsArray] = useState([]);
  const handleCreateAssessment = (values) => {
    if (questionsArray.length === 0) {
      toast.error("Please add questions to the assessment");
    }
    console.log(values.title, values.description, totalPoints, questionsArray);
  };

  const addQuestion = (index, question) => {
    const updatedQuestionsArray = [...questionsArray];
    totalPoints += question.question_point;
    updatedQuestionsArray[index] = question;
    setQuestionsArray(updatedQuestionsArray);
  };

  useEffect(() => {
    console.log(questionsArray);
  }, [questionsArray]);

  const removeQuestion = (indexToRemove) => {
    const updatedQuestionsArray = [...questionsArray];
    totalPoints -= updatedQuestionsArray[indexToRemove].question_point;
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
          <Row>
            <Col>
              <h1 className="text-center mb-4">Assessment Creation</h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12} xs={12}>
              <Form>
                <FormGroup>
                  <Label for="assessmentTitle">Assessment Title</Label>
                  <Input
                    type="text"
                    placeholder="Enter assessment title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={errors.title && touched.title ? styles.error : {}}
                  />
                  {errors.title && touched.title && (
                    <div style={styles.errorMessage}>{errors.title}</div>
                  )}
                  <Label for="" className="mt-1">
                    Assessment Description
                  </Label>
                  <Input
                    id="exampleText"
                    name="description"
                    placeholder="Write Description "
                    type="textarea"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={
                      errors.description && touched.description
                        ? styles.error
                        : {}
                    }
                  />
                  {errors.description && touched.description && (
                    <div style={styles.errorMessage}>{errors.description}</div>
                  )}
                </FormGroup>
              </Form>
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
            className=""
            onClick={() => {
              setQuestionsArray([...questionsArray, null]);
            }}
          >
            Add Question
          </Button>

          <Button
            className="mx-3"
            onClick={handleSubmit}
            style={styles.primaryButton}
          >
            Submit Assessment
          </Button>
        </Container>
      )}
    </Formik>
  );
}
