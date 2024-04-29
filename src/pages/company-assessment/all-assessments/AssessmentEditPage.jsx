import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionEdit from "../../../components/company-assessments/QuestionEdit";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import url from "../../../utils/api";
import auth from "../../../utils/helper";
import axios from "axios";
import NewQuestion from "../../../components/company-assessments/NewQuestion";

export default function EditAssessmentPage() {
  const { id } = useParams();
  //info edit
  const infoMutate = useMutation({
    mutationFn: (values) => {
      const protocol = window.location.protocol;
      console.log(values.question);
      console.log(values.id);
      return axios.put(
        `${protocol}//${url}/assessment/update-assessment/${values.id}/`,
        {
          assessment: {
            title: values.title,
            description: values.desc,
            total_points: values.totalPoints,
          },
        },

        {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
        }
      );
    },
  });

  //delete question
  const deleteQuestionMutate = useMutation({
    mutationFn: (id) => {
      const protocol = window.location.protocol;
      return axios.delete(
        `${protocol}//${url}/assessment/update-questions/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
        }
      );
    },
  });
  //add new question
  const addQuestionMutate = useMutation({
    mutationFn: (values) => {
      const protocol = window.location.protocol;
      return axios.post(
        `${protocol}//${url}/assessment/create-questions/${values.id}/`,
        {
          questions: [
            {
              question_desc: values.question.question_desc
                ? values.question.question_desc
                : "",
              question_type: values.question.question_type
                ? values.question.question_type
                : "",
              question_point: values.question.question_point
                ? values.question.question_point
                : 0,
              answer_text: values.question.answer_text
                ? values.question.answer_text
                : "",
              number_of_options: values.question.number_of_options
                ? values.question.number_of_options
                : 0,
              options: values.question.options ? values.question.options : [],
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
        }
      );
    },
  });

  //edit question
  const editQuestionMutate = useMutation({
    mutationFn: (values) => {
      const protocol = window.location.protocol;
      return axios.put(
        `${protocol}//${url}/assessment/update-questions/${values.id}/`,
        {
          assessment_pk: values.assessmentid,
          questions: {
            question_desc: values.question.question_desc
              ? values.question.question_desc
              : "",
            question_type: values.question.question_type
              ? values.question.question_type
              : "",
            number_of_options: values.question.number_of_options
              ? values.question.number_of_options
              : 0,
            answer_text: values.question.answer_text
              ? values.question.answer_text
              : "",
            question_point: values.question.question_point
              ? values.question.question_point
              : 0,
            options: values.question.options ? values.question.options : [],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
        }
      );
    },
  });

  //functions for above mutautions
  const editInfo = (title, desc, score, id) => {
    try {
      const response = infoMutate.mutate({
        title: title,
        desc: desc,
        score: score,
        id: id,
      });
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  const addQuestion = (index, question) => {
    addQuestionMutate.mutate({ question: question, id: id });
  };

  const removeQuestion = (id) => {
    deleteQuestionMutate.mutate(id);
  };

  let enableEdit = true;

  const fetchAssessments = async () => {
    try {
      const protocol = window.location.protocol;
      const response = await axios.get(
        `${protocol}//${url}/assessment/update-assessment/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
        }
      );
      if (!response.data) {
        throw new Error("No data received");
      }

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const editQuestion = (values, id, ass) => {
    editQuestionMutate.mutate({
      question: values,
      id: id,
      assessmentid: ass,
    });
  };
  //fetching data
  const {
    isPending,
    error,
    isSuccess,
    data: assessment,
  } = useQuery({
    queryKey: ["assessment"],
    queryFn: fetchAssessments,
  });

  const handleCreateAssessment = (values) => {
    console.log(values.title, values.description, totalPoints, questionsArray);
    if (questionsArray.length === 0) {
      toast.error("Please add questions to the assessment");
    } else if (questionsArray.some((question) => question === null)) {
      toast.error("Please fill all the questions");
    }
  };

  const [totalPoints, setTotalPoints] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [newQuestionsArray, setNewQuestionsArray] = useState([]);

  const removeNewQuestion = (indexToRemove) => {
    const updatedQuestionsArray = [...newQuestionsArray];
    updatedQuestionsArray.splice(indexToRemove, 1);
    setNewQuestionsArray(updatedQuestionsArray);
  };

  useEffect(() => {
    console.log(newQuestionsArray);
  }, [newQuestionsArray]);

  return (
    <>
      {!isPending ? (
        <Formik
          initialValues={{
            title: assessment ? assessment[0].title : "",
            description: assessment ? assessment[0].description : "",
          }}
          validationSchema={AssessmentSchema}
          onSubmit={(values) => {
            handleCreateAssessment(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Container className="mt-5">
              {setTotalPoints(assessment[0].total_points)}
              {setQuestionsArray(assessment[0].questions)}
              {console.log(assessment)}
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
                      <Row>
                        <Col>
                          <h1
                            style={styles.descriptionColor}
                            className="fw-bold"
                          >
                            Total Points: {assessment[0].total_points}
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
                              <div style={styles.errorMessage}>
                                {errors.title}
                              </div>
                            )}
                          </div>
                          <Button
                            style={styles.primaryButton}
                            className="my-2"
                            onClick={() =>
                              editInfo(
                                values.title,
                                values.description,
                                assessment[0].total_points,
                                assessment[0].id
                              )
                            }
                          >
                            Edit the Title and Description
                          </Button>
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
                            <QuestionEdit
                              key={index}
                              index={index}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              enableEdit={enableEdit}
                              question={question}
                              addQuestion={addQuestion}
                              removeQuestion={removeQuestion}
                              editQuestion={editQuestion}
                              id={assessment[0].id}
                            />
                          ))}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {newQuestionsArray.map((question, index) => (
                            <NewQuestion
                              index={index}
                              question={question}
                              enableEdit={false}
                              addQuestion={addQuestion}
                              removeNewQuestion={removeNewQuestion}
                            />
                          ))}
                        </Col>
                      </Row>
                      <Button
                        style={styles.primaryButton}
                        className="mt-2"
                        onClick={() => {
                          setNewQuestionsArray([...newQuestionsArray, null]);
                        }}
                        disabled={newQuestionsArray.length > 0}
                      >
                        Add Question
                      </Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
              {/* For Toasters */}
              {infoMutate.isSuccess &&
                toast.success(infoMutate.data.data.message)}
              {infoMutate.isError && toast.success("Error updating name")}
              {deleteQuestionMutate.isError &&
                toast.error("Error deleting question")}
              {deleteQuestionMutate.isSuccess &&
                toast.success("Question deleted successfully!")}
              {editQuestionMutate.isSuccess &&
                toast.success(editQuestionMutate.data.data.message)}
              {addQuestionMutate.isSuccess &&
                toast.success(addQuestionMutate.data.data.message)}
              {addQuestion.isError && toast.error("Error adding question")}
            </Container>
          )}
        </Formik>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
