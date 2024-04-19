import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Question from "../../../components/company-assessments/Question";

export default function CreateAssessmentForm() {
  const [questionsArray, setQuestionArray] = useState([]);
  const addQuestion = () => {};
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Assessment Creation</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={12} xs={12}>
          <Form>
            <FormGroup>
              <Label for="assessmentTitle">Assessment Title</Label>
              <Input type="text" placeholder="Enter assessment title" />
              <Label for="">Assessment Description</Label>
              <Input
                id="exampleText"
                name="text"
                placeholder="Write Description "
                type="textarea"
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Question />
        </Col>
      </Row>
      <Button color="primary" className="mb-3" onClick={addQuestion}>
        Add Question
      </Button>
    </Container>
  );
}
