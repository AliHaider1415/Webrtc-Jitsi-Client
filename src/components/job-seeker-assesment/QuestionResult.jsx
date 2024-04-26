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

export default function QuestionResult(props) {
  let { question, index } = props;

  return (
    <Card className="mb-4 roboto-thin" style={styles.input}>
      <CardBody>
        <>
          <CardHeader className="fw-bold">Question {index + 1}</CardHeader>
          <CardHeader className="mt-2 fw-bold" style={styles.primaryButton}>
            Obtained Marks:{question.scored_points}/{question.question_point}
          </CardHeader>
        </>

        <Form>
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
                      <Col xs={12}>
                        <div className="position-relative d-flex align-items-center">
                          <Input
                            type="text"
                            readOnly
                            name={`options[${idx}].option_text`}
                            value={option.option_text}
                            style={
                              option.option_text !== question.user_answer
                                ? styles.input
                                : question.scored_points === 0
                                ? styles.wrongAns
                                : styles.correctAns
                            }
                          />

                          <Input
                            type="radio"
                            name="correct_ans"
                            checked={
                              option.option_text === question.user_answer
                            }
                            value={option.option_text}
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
                  value={question.user_answer}
                  style={
                    question.scored_points === 0
                      ? styles.wrongAns
                      : styles.correctAns
                  }
                  placeholder="Write your answer here"
                />
              </Col>
            </Row>
          )}
        </Form>
      </CardBody>
    </Card>
  );
}
