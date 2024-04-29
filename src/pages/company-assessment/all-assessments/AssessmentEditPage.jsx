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

export default function EditAssessmentPage() {
  const infoMutate = useMutation({
    mutationFn: (values) => {
      const protocol = window.location.protocol;
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

  const editInfo = async (title, desc, score, id) => {
    try {
      const response = await infoMutate.mutate({
        title: title,
        desc: desc,
        score: score,
        id: id,
      });
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };
  const addQuestion = (id) => {};
  const editQuestion = () => {};
  const removeQuestion = async (id) => {
    await deleteQuestionMutate.mutate(id);
  };

  const { id } = useParams();
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
  //fetching data
  const {
    isPending,
    error,
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
  const [newQuestion, setNewQuestion] = useState([]);

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
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
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
            </Container>
          )}
        </Formik>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
