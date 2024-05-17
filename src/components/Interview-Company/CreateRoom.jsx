import React from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Label,
  Button,
} from "reactstrap";

import { ScheduleInterviewSchema } from "../../utils/Schemas";

import { Formik } from "formik";
import styles from "../../utils/styles";

export default function CreateRoom() {
  return (
    <CardBody>
      <Formik
        initialValues={{
          room_name: "",
          candidate_id: "",
        }}
        validationSchema={ScheduleInterviewSchema}
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
        }) => (
          <Container className="mt-5  ">
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
                          Shedule New Interview
                        </h1>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md={6} sm={12}>
                        <div>
                          <Label style={styles.descriptionColor}>
                            Room Name
                          </Label>
                          <Input
                            id="exampleText"
                            name="room_name"
                            placeholder="Enter Room Name"
                            type="text"
                            value={values.room_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={
                              errors.room_name && touched.room_name
                                ? styles.error
                                : styles.input
                            }
                          />
                          {errors.room_name && touched.room_name && (
                            <div style={styles.errorMessage}>
                              {errors.room_name}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col md={6} sm={12}>
                        <div>
                          <Label style={styles.descriptionColor}>
                            Candidate ID
                          </Label>
                          <Input
                            id="exampleText"
                            name="candidate_id"
                            placeholder="Enter Candidate ID"
                            type="number"
                            value={values.candidate_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={
                              errors.candidate_id && touched.candidate_id
                                ? styles.error
                                : styles.input
                            }
                          />
                          {errors.candidate_id && touched.candidate_id && (
                            <div style={styles.errorMessage}>
                              {errors.candidate_id}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>

                    <Button
                      className="mx-1 mt-2"
                      onClick={handleSubmit}
                      style={styles.primaryButton}
                    >
                      Create Room
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Container>
        )}
      </Formik>
    </CardBody>
  );
}
