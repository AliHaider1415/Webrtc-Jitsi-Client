import React from "react";
import {
  FormGroup,
  Input,
  CardBody,
  CardHeader,
  Card,
  Row,
  Col,
} from "reactstrap";
import { Formik, Form } from "formik";
import { QuestionSchema } from "../../utils/Schemas";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function Question() {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardHeader>Question 1</CardHeader>
        <Formik
          initialValues={{
            question_desc: "",
            question_type: "MCQ",
            question_point: "",
            number_of_options: 2,
            correct_ans: "",
            options: [{ option_text: "" }, { option_text: "" }],
          }}
          validationSchema={QuestionSchema}
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
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mt-2">
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
                      : {}
                  }
                />
                {errors.question_desc && touched.question_desc && (
                  <div style={styles.errorMessage}>{errors.question_desc}</div>
                )}
              </FormGroup>
              <FormGroup>
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
                      : {}
                  }
                />
                {errors.question_point && touched.question_point && (
                  <div style={styles.errorMessage}>{errors.question_point}</div>
                )}
              </FormGroup>
              <Input
                placeholder="Select Type"
                type="select"
                name="question_type"
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value === "MCQ") {
                    handleChange({
                      target: { name: "number_of_options", value: 2 },
                    });
                  } else if (e.target.value === "True Or False") {
                    handleChange({
                      target: { name: "number_of_options", value: 2 },
                    });
                    setFieldValue("options", [
                      { option_text: "True" },
                      { option_text: "False" },
                    ]);
                  }
                }}
                value={values.question_type}
              >
                <option value="MCQ">Multiple Choice</option>
                <option value="Short">Short Answer</option>
                <option value="True Or False">True/False</option>
              </Input>
              {values.question_type === "MCQ" && (
                <>
                  <Row>
                    {values.number_of_options > 0 &&
                      Array.from({ length: values.number_of_options }).map(
                        (_, index) => (
                          <Col sm={6} key={index}>
                            <FormGroup
                              style={{ position: "relative", height: "50px" }}
                            >
                              <Input
                                type="text"
                                name={`options[${index}].option_text`}
                                placeholder={`Option ${index + 1}`}
                                value={values.options[index].option_text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.options &&
                                errors.options[index] &&
                                errors.options[index].option_text &&
                                touched.options &&
                                touched.options[index] &&
                                touched.options[index].option_text && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "100%",
                                      left: 0,
                                    }}
                                  >
                                    {errors.options[index].option_text}
                                  </div>
                                )}
                              <Input
                                type="radio"
                                name="correct_ans"
                                onChange={handleChange}
                                value={values.options[index].option_text}
                                className="radio-inside-input"
                                style={{
                                  position: "absolute",
                                  right: "8px",
                                  top: "50%",
                                  transform: "translateY(-100%)",
                                }}
                              />
                              {values.number_of_options > 2 && (
                                <DeleteIcon
                                  onClick={() => {
                                    const updatedOptions =
                                      values.options.filter(
                                        (option, idx) => idx !== index
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
                                    left: "5px",
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </FormGroup>
                          </Col>
                        )
                      )}
                  </Row>
                  <div
                    className="btn-primary btn"
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
                  </div>
                </>
              )}

              {values.question_type === "True Or False" && (
                <Row>
                  {values.options.map((option, index) => (
                    <Col sm={6} key={index}>
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

              <div onClick={handleSubmit} className="btn-danger btn">
                Click
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
