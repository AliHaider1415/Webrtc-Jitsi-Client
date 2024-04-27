import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../../../components/company-assessments/Question";
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
import { Formik, Form } from "formik";
import { AssessmentSchema } from "../../../utils/Schemas";
import { toast } from "react-toastify";
import styles from "../../../utils/styles";

export default function EditAssessmentPage() {
  let assessment = {
    id: 1,
    questions: [
      {
        id: 1,
        options: [
          { id: 1, option_text: "React" },
          { id: 2, option_text: "Angular" },
          { id: 3, option_text: "Vue" },
          { id: 4, option_text: "Ember" },
        ],
        question_desc:
          "Which JavaScript framework is commonly used for building user interfaces?",
        question_type: "MCQ",
        question_point: 2,
        number_of_options: 4,
        answer_text: "React",
        assessment: 1,
      },
      {
        id: 2,
        options: [
          { id: 1, option_text: "True" },
          { id: 2, option_text: "False" },
        ],
        question_desc:
          "React is a JavaScript library for building user interfaces.",
        question_type: "True Or False",
        question_point: 2,
        number_of_options: 2,
        answer_text: "True",
        assessment: 1,
      },
      {
        id: 3,
        options: [],
        question_desc: "What does JSX stand for?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text: "JavaScript XML",
        assessment: 1,
      },
      {
        id: 4,
        options: [
          { id: 1, option_text: "Virtual DOM" },
          { id: 2, option_text: "Actual DOM" },
          { id: 3, option_text: "HTML" },
          { id: 4, option_text: "CSS" },
        ],
        question_desc:
          "What is the core concept behind React's performance optimization?",
        question_type: "MCQ",
        question_point: 2,
        number_of_options: 4,
        answer_text: "Virtual DOM",
        assessment: 1,
      },
      {
        id: 5,
        options: [],
        question_desc: "What are React Hooks?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text:
          "React Hooks are functions that let you use state and other React features without writing a class.",
        assessment: 1,
      },
      {
        id: 6,
        options: [
          { id: 1, option_text: "Component-based" },
          { id: 2, option_text: "Object-oriented" },
          { id: 3, option_text: "Functional" },
          { id: 4, option_text: "Procedural" },
        ],
        question_desc: "How would you describe React's architecture?",
        question_type: "MCQ",
        question_point: 2,
        number_of_options: 4,
        answer_text: "Component-based",
        assessment: 1,
      },
      {
        id: 7,
        options: [],
        question_desc: "What is JSX?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text:
          "JSX stands for JavaScript XML. It is a syntax extension for JavaScript.",
        assessment: 1,
      },
      {
        id: 8,
        options: [
          { id: 1, option_text: "State" },
          { id: 2, option_text: "Props" },
          { id: 3, option_text: "Context" },
          { id: 4, option_text: "Redux" },
        ],
        question_desc: "How can you manage component data in React?",
        question_type: "MCQ",
        question_point: 2,
        number_of_options: 4,
        answer_text: "State",
        assessment: 1,
      },
      {
        id: 9,
        options: [],
        question_desc: "What is a React component?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text:
          "A React component is a reusable piece of code that returns a React element.",
        assessment: 1,
      },
      {
        id: 10,
        options: [
          { id: 1, option_text: "Yes" },
          { id: 2, option_text: "No" },
        ],
        question_desc: "Can you use React to build mobile applications?",
        question_type: "MCQ",
        question_point: 2,
        number_of_options: 2,
        answer_text: "Yes",
        assessment: 1,
      },
    ],
    title: "React Developer Test",
    description: "Test your knowledge of React.js with this assessment.",
    total_points: 20,
    company: "ReactTech",
  };

  const { id } = useParams();
  let enableEdit = true;

  const [totalPoints, setTotalPoints] = useState(assessment.total_points);
  //question array
  const [questionsArray, setQuestionsArray] = useState(assessment.questions);
  useEffect(() => {
    console.log(questionsArray);
  }, [questionsArray]);

  //handle create assessment
  const handleCreateAssessment = (values) => {
    console.log(values.title, values.description, totalPoints, questionsArray);
    if (questionsArray.length === 0) {
      toast.error("Please add questions to the assessment");
    } else if (questionsArray.some((question) => question === null)) {
      toast.error("Please fill all the questions");
    }
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
        title: assessment.title,
        description: assessment.description,
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
            <CardBody>
              <Form>
                <FormGroup>
                  <Row>
                    <Col>
                      <h1
                        className="text-center mb-4 fw-bold"
                        style={styles.descriptionColor}
                      >
                        Edit your assessment
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
                    >
                      Save the Changes
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
