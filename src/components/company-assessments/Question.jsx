import React from "react";
import {
  FormGroup,
  Input,
  CardBody,
  CardHeader,
  Card,
  Row,
  Col,
  Button,
  Label,
} from "reactstrap";
import { Formik, Form } from "formik";
import { QuestionSchema } from "../../utils/Schemas";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../../utils/styles";
export default function Question({
  index,
  question,
  addQuestion,
  removeQuestion,
}) {
  return (
    <Card className="mb-4 roboto-thin" style={styles.input}>
      <CardBody>
        <Row className="justify-content-center d-flex ">
          <Col>
            <CardHeader className="">Question {index + 1}</CardHeader>
          </Col>
          <Col>
            <Button
              className="btn-danger btn ml-3"
              onClick={() => removeQuestion(index)}
            >
              Remove Question
            </Button>
          </Col>
        </Row>
        <Formik
          initialValues={
            question || {
              question_desc: "",
              question_type: "MCQ",
              question_point: "",
              number_of_options: 2,
              correct_ans: "",
              options: [{ option_text: "" }, { option_text: "" }],
            }
          }
          enableReinitialize
          validationSchema={QuestionSchema}
          onSubmit={(values) => {
            console.log(values);
            addQuestion(index, values);
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
            <Form onBlur={handleSubmit}>
              <Row>
                <Col>
                  <Label style={styles.descriptionColor}>
                    Question Description
                  </Label>
                  <Input
                    enableReinitialize
                    type="textarea"
                    name="question_desc"
                    placeholder="Write your question here"
                    value={
                      question ? question.question_desc : values.question_desc
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={
                      errors.question_desc && touched.question_desc
                        ? styles.error
                        : styles.input
                    }
                  />
                  {errors.question_desc && touched.question_desc && (
                    <div style={styles.errorMessage}>
                      {errors.question_desc}
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label style={styles.descriptionColor}>Marks </Label>
                  <Input
                    type="number"
                    name="question_point"
                    placeholder="Marks of Question"
                    value={
                      question ? question.question_point : values.question_point
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={
                      errors.question_point && touched.question_point
                        ? styles.error
                        : styles.input
                    }
                  />
                  {errors.question_point && touched.question_point && (
                    <div style={styles.errorMessage}>
                      {errors.question_point}
                    </div>
                  )}
                </Col>
                <Col>
                  <Label style={styles.descriptionColor}>Question Type</Label>
                  <Input
                    placeholder="Select Type"
                    type="select"
                    name="question_type"
                    style={styles.input}
                    className="mb-3"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value === "MCQ") {
                        handleChange({
                          target: { name: "number_of_options", value: 2 },
                        });
                        setFieldValue("options", [
                          { option_text: "" },
                          { option_text: "" },
                        ]);
                        setFieldValue("correct_ans", "");
                      } else if (e.target.value === "True Or False") {
                        handleChange({
                          target: { name: "number_of_options", value: 2 },
                        });
                        setFieldValue("options", [
                          { option_text: "True" },
                          { option_text: "False" },
                        ]);
                      } else {
                        handleChange({
                          target: { name: "number_of_options", value: 0 },
                        });
                        setFieldValue("options", []);
                        setFieldValue("correct_ans", "non-specified");
                      }
                    }}
                    value={
                      question ? question.question_type : values.question_type
                    }
                  >
                    <option value="MCQ">Multiple Choice</option>
                    <option value="Short">Short Answer</option>
                    <option value="True Or False">True/False</option>
                  </Input>
                </Col>
              </Row>

              {question
                ? question.question_type === "MCQ" && (
                    <>
                      <Row>
                        <Label style={styles.descriptionColor}>Options</Label>
                        {question.options.map((option, idx) => (
                          <Col sm={6} key={idx}>
                            <FormGroup
                              style={{ position: "relative", height: "50px" }}
                            >
                              <div>
                                <Input
                                  type="text"
                                  name={`options[${idx}].option_text`}
                                  placeholder={`Option ${idx + 1}`}
                                  value={option.option_text}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  style={
                                    errors.options &&
                                    errors.options[idx] &&
                                    errors.options[idx].option_text &&
                                    touched.options &&
                                    touched.options[idx] &&
                                    touched.options[idx].option_text
                                      ? styles.error
                                      : styles.input
                                  }
                                />
                                <Input
                                  type="radio"
                                  name="correct_ans"
                                  onChange={handleChange}
                                  value={option.option_text}
                                  className="radio-inside-input"
                                  style={{
                                    position: "absolute",
                                    right: "8px",
                                    top: "50%",
                                    transform: "translateY(-100%)",
                                    ...(errors.correct_ans ? styles.error : {}),
                                  }}
                                />
                              </div>
                              {question.number_of_options > 2 && (
                                <DeleteIcon
                                  onClick={() => {
                                    const updatedOptions =
                                      question.options.filter(
                                        (_, i) => i !== idx
                                      );
                                    setFieldValue("options", updatedOptions);
                                    setFieldValue(
                                      "number_of_options",
                                      updatedOptions.length
                                    );
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "-15px",
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </FormGroup>
                          </Col>
                        ))}
                      </Row>
                      <Button
                        style={styles.secondaryButton}
                        onClick={() => {
                          setFieldValue(
                            "number_of_options",
                            question.number_of_options + 1
                          );
                          setFieldValue("options", [
                            ...question.options,
                            { option_text: "" },
                          ]);
                        }}
                      >
                        Add Option
                      </Button>
                    </>
                  )
                : values.question_type === "MCQ" && (
                    <>
                      <Row>
                        <Label style={styles.descriptionColor}>Options</Label>

                        {values.options.map((option, idx) => (
                          <Col md={6} key={idx}>
                            <FormGroup
                              style={{
                                position: "relative",
                                height: "50px",
                              }}
                            >
                              <div>
                                <Input
                                  type="text"
                                  name={`options[${idx}].option_text`}
                                  placeholder={`Option ${idx + 1}`}
                                  value={option.option_text}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  style={
                                    errors.options &&
                                    errors.options[idx] &&
                                    errors.options[idx].option_text &&
                                    touched.options &&
                                    touched.options[idx] &&
                                    touched.options[idx].option_text
                                      ? styles.error
                                      : styles.input
                                  }
                                />
                                <Input
                                  type="radio"
                                  name="correct_ans"
                                  onChange={handleChange}
                                  value={option.option_text}
                                  className="radio-inside-input"
                                  style={{
                                    position: "absolute",
                                    right: "8px",
                                    top: "50%",
                                    transform: "translateY(-100%)",
                                    ...(errors.correct_ans ? styles.error : {}),
                                  }}
                                />
                              </div>
                              {values.number_of_options > 2 && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "15%",
                                    right: "-20px",
                                  }}
                                >
                                  <DeleteIcon
                                    onClick={() => {
                                      const updatedOptions =
                                        values.options.filter(
                                          (_, i) => i !== idx
                                        );
                                      setFieldValue("options", updatedOptions);
                                      setFieldValue(
                                        "number_of_options",
                                        updatedOptions.length
                                      );
                                    }}
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        ))}
                      </Row>
                      <Button
                        style={styles.secondaryButton}
                        onClick={() => {
                          setFieldValue(
                            "number_of_options",
                            values.number_of_options + 1
                          );
                          setFieldValue("options", [
                            ...values.options,
                            { option_text: "" },
                          ]);
                        }}
                      >
                        Add Option
                      </Button>
                    </>
                  )}

              {question
                ? question.question_type === "True Or False" && (
                    <Row>
                      {question.options.map((option, idx) => (
                        <Col sm={6} key={idx}>
                          <FormGroup style={{ position: "relative" }}>
                            <Input
                              type="text"
                              name={`options[${idx}].option_text`}
                              placeholder={`Option ${idx + 1}`}
                              value={option.option_text}
                              readOnly
                              style={{ paddingRight: "30px" }}
                            />
                            <Input
                              type="radio"
                              name="correct_ans"
                              onChange={handleChange}
                              value={option.option_text}
                              className="radio-inside-input"
                              style={{
                                position: "absolute",
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-70%)",
                              }}
                            />
                          </FormGroup>
                        </Col>
                      ))}
                    </Row>
                  )
                : values.question_type === "True Or False" && (
                    <Row>
                      {values.options.map((option, index) => (
                        <Col key={index}>
                          <FormGroup style={{ position: "relative" }}>
                            <Input
                              type="text"
                              name={`options[${index}].option_text`}
                              placeholder={`Option ${index + 1}`}
                              value={option.option_text}
                              readOnly
                              style={{ paddingRight: "30px" }}
                            />
                            <Input
                              type="radio"
                              name="correct_ans"
                              onChange={handleChange}
                              value={option.option_text}
                              className="radio-inside-input"
                              style={{
                                position: "absolute",
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-70%)",
                              }}
                            />
                          </FormGroup>
                        </Col>
                      ))}
                    </Row>
                  )}
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
