import React from "react";
import styles from "../../utils/styles";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  Row,
  Col,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { Formik } from "formik";
import { AnswerSchema } from "../../utils/Schemas";

export default function QuestionAttempt(props) {
  let { question, index, addAnswers } = props;

  return (
    <Card className="mb-4 roboto-thin" style={styles.input}>
      <CardBody>
        <>
          <CardHeader className="fw-bold">Question {index + 1}</CardHeader>
          <CardHeader className="mt-2 fw-bold">
            Max Marks:{question.question_point}
          </CardHeader>
        </>
        <Formik
          initialValues={{
            answer_text: "",
            question: question.id,
          }}
          validationSchema={AnswerSchema}
          onSubmit={(values) => {
            addAnswers(values, index);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <Form onBlur={handleSubmit}>
              <Row className="mt-4">
                <Col>
                  <Label style={styles.descriptionColor} className="fw-bold">
                    Question Description
                  </Label>

                  <Input
                    readOnly
                    type="textarea"
                    name="question_desc"
                    value={question.question_desc}
                    style={styles.input}
                  />
                </Col>
              </Row>
              {(question.question_type === "MCQ" ||
                question.question_type === "True Or False") && (
                <>
                  <Row className="justify-content-center d-flex mt-1">
                    <Label style={styles.descriptionColor} className="fw-bold">
                      Choose the correct option
                    </Label>

                    {question.options.map((option, idx) => (
                      <FormGroup
                        style={{
                          position: "relative",
                          height: "50px",
                        }}
                      >
                        <Row>
                          {" "}
                          <Col xs={12}>
                            <div className="position-relative d-flex align-items-center">
                              <Input
                                type="text"
                                readOnly
                                name={`options[${idx}].option_text`}
                                placeholder={`Option ${idx + 1}`}
                                value={option.option_text}
                                style={styles.input}
                              />
                              <Input
                                type="radio"
                                name="answer_text"
                                value={option.option_text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="radio-inside-input position-absolute"
                                style={{
                                  right: "5px",
                                  top: "30%",
                                  transform: "translateY(-50%)",
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    ))}
                  </Row>
                </>
              )}
              {question.question_type === "Text Based" && (
                <Row className="mt-1">
                  <Col>
                    <Label style={styles.descriptionColor} className="fw-bold">
                      Answer
                    </Label>
                    <Input
                      type="textarea"
                      name="answer_text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={styles.input}
                      placeholder="Write your answer here"
                    />
                  </Col>
                </Row>
              )}
              {errors.answer_text && (
                <div style={styles.errorMessage}>{errors.answer_text}</div>
              )}
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
