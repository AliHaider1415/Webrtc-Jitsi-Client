import React, { useState } from "react";
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

const styles = {
  error: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    fontSize: "0.8em",
    marginTop: "0.2em",
  },
};
export default function CreateAssessmentForm() {
  const [questionsArray, setQuestionsArray] = useState([]);

  const addQuestion = (index, question) => {
    const updatedQuestionsArray = [...questionsArray];
    updatedQuestionsArray.splice(index, 1);
    setQuestionsArray(updatedQuestionsArray);
  };

  const removeQuestion = (index) => {
    const updatedQuestionsArray = questionsArray.filter(
      (question, i) => i !== index
    );
    setQuestionsArray(updatedQuestionsArray);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Assessment Creation</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={12} xs={12}>
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            validationSchema={AssessmentSchema}
            onSubmit={(values) => {
              console.log(values);
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
                  <Label for="">Assessment Description</Label>
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
            )}
          </Formik>
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
              removeQuestion={removeQuestion}
            />
          ))}
        </Col>
      </Row>
      <Button
        color="primary"
        className="mb-3"
        onClick={() => {
          setQuestionsArray([...questionsArray, null]);
        }}
      >
        Add Question
      </Button>
    </Container>
  );
}
