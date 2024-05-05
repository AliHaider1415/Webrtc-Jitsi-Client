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
import styles from "../../utils/styles";
import DeleteIcon from "@mui/icons-material/Delete";

export default function QuestionEdit({
  index,
  id,
  question,
  enableEdit,
  addQuestion,
  removeQuestion,
  editQuestion,
  editTitle,
}) {
  return (
    <Card className="mb-4 roboto-thin" style={styles.input}>
      <CardBody>
        <>
          <CardHeader>Question {index + 1}</CardHeader>
          <Button
            className="btn-danger btn  mt-2"
            onClick={() => removeQuestion(question.id)}
          >
            Remove Question
          </Button>
        </>
        <Formik
          initialValues={{
            question_desc: question ? question.question_desc : "",
            question_type: question ? question.question_type : "MCQ",
            question_point: question ? question.question_point : 1,
            number_of_options: question ? question.number_of_options : 2,
            answer_text: question ? question.answer_text : "",
            options: question
              ? question.options
              : [{ option_text: "" }, { option_text: "" }],
          }}
          enableReinitialize
          validationSchema={QuestionSchema}
          onSubmit={(values) => {
            editQuestion(values, question.id, id);
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
              <Row className="mt-4">
                <Col>
                  <Label style={styles.descriptionColor}>
                    Question Description
                  </Label>
                  <Input
                    type="textarea"
                    name="question_desc"
                    placeholder="Write your question here"
                    value={values.question_desc}
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
              <Row className="mt-1">
                <Col>
                  <Label style={styles.descriptionColor}>Marks </Label>
                  <Input
                    type="number"
                    name="question_point"
                    placeholder="Marks of Question"
                    value={values.question_point}
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
                        setFieldValue("answer_text", "");
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
                        setFieldValue("answer_text", "non-specified");
                      }
                    }}
                    value={values.question_type}
                  >
                    <option value="MCQ">Multiple Choice</option>
                    <option value="Text Based">Text Based</option>
                    <option value="True Or False">True/False</option>
                  </Input>
                </Col>
              </Row>
              {values.question_type === "MCQ" && (
                <>
                  <Row className="justify-content-center d-flex">
                    <Label style={styles.descriptionColor}>Options</Label>

                    {values.options.map((option, idx) => (
                      <FormGroup
                        style={{
                          position: "relative",
                          height: "50px",
                        }}
                      >
                        <Row>
                          {" "}
                          <Col xs={10} sm={10} md={11}>
                            <div className="position-relative d-flex align-items-center">
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
                              {enableEdit ? (
                                <Input
                                  type="radio"
                                  name="answer_text"
                                  onChange={handleChange}
                                  checked={
                                    values.answer_text === option.option_text
                                  }
                                  value={option.option_text}
                                  className="radio-inside-input position-absolute"
                                  style={{
                                    right: "5px",
                                    top: "30%",
                                    transform: "translateY(-50%)",
                                  }}
                                />
                              ) : (
                                <Input
                                  type="radio"
                                  name="answer_text"
                                  onChange={handleChange}
                                  value={option.option_text}
                                  className="radio-inside-input position-absolute"
                                  style={{
                                    right: "5px",
                                    top: "30%",
                                    transform: "translateY(-50%)",
                                  }}
                                />
                              )}
                            </div>
                          </Col>
                          <Col xs={2} sm={2} md={1}>
                            {values.number_of_options > 2 && (
                              <div>
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
                          </Col>
                        </Row>
                        {errors.options
                          ? errors.options &&
                            errors.options[idx] &&
                            errors.options[idx].option_text &&
                            touched.options &&
                            touched.options[idx] &&
                            touched.options[idx].option_text && (
                              <div style={styles.errorMessage}>
                                {errors.options[idx].option_text}
                              </div>
                            )
                          : ""}
                      </FormGroup>
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
              {values.question_type === "True Or False" && (
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
                        {enableEdit ? (
                          <Input
                            type="radio"
                            name="answer_text"
                            onChange={handleChange}
                            checked={values.answer_text === option.option_text}
                            value={option.option_text}
                            className="radio-inside-input position-absolute"
                            style={{
                              right: "5px",
                              top: "30%",
                              transform: "translateY(-50%)",
                            }}
                          />
                        ) : (
                          <Input
                            type="radio"
                            name="answer_text"
                            onChange={handleChange}
                            value={option.option_text}
                            className="radio-inside-input position-absolute"
                            style={{
                              right: "5px",
                              top: "30%",
                              transform: "translateY(-50%)",
                            }}
                          />
                        )}
                      </FormGroup>
                    </Col>
                  ))}
                </Row>
              )}
              <Button
                style={styles.secondaryButton}
                className="mx-1"
                onClick={handleSubmit}
              >
                Edit Question
              </Button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
