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

import { RoomJoinSchema } from "../../utils/Schemas";

import { Formik } from "formik";
import styles from "../../utils/styles";
// import socketStore from "../../store/socketStore/socketStore";

export default function Lobby() {
  //   const { socket } = socketStore();

  return (
    <CardBody>
      <Formik
        initialValues={{
          room_id: "",
          email: "",
        }}
        validationSchema={RoomJoinSchema}
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
                          Join Room
                        </h1>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md={12}>
                        <div>
                          <Label
                            for="assessmentTitle"
                            style={styles.descriptionColor}
                          >
                            Email
                          </Label>
                          <Input
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={
                              errors.email && touched.email
                                ? styles.error
                                : styles.input
                            }
                          />
                          {errors.email && touched.email && (
                            <div style={styles.errorMessage}>
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <div>
                          <Label style={styles.descriptionColor}>Room ID</Label>
                          <Input
                            id="exampleText"
                            name="room_id"
                            placeholder="Enter Room ID"
                            type="text"
                            value={values.room_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={
                              errors.room_id && touched.room_id
                                ? styles.error
                                : styles.input
                            }
                          />
                          {errors.room_id && touched.room_id && (
                            <div style={styles.errorMessage}>
                              {errors.room_id}
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
                      Join Room
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
