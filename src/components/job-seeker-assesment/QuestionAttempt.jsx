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
            correct_ans: "",
            question: question.id,
          }}
          onSubmit={(values) => {
            addAnswers(values, index);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit }) => (
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
                                name="correct_ans"
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
              {question.question_type === "Short" && (
                <Row className="mt-1">
                  <Col>
                    <Label style={styles.descriptionColor} className="fw-bold">
                      Answer
                    </Label>
                    <Input
                      type="textarea"
                      name="correct_ans"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={styles.input}
                      placeholder="Write your answer here"
                    />
                  </Col>
                </Row>
              )}
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
