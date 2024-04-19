import React from "react";
import { FormGroup, Input, CardBody, CardHeader, Form, Card } from "reactstrap";
import { Formik } from "formik";
export default function Question() {
  return (
    <Formik>
      <Card className="mb-4">
        <CardBody>
          <CardHeader>Question 1</CardHeader>
          <Form>
            <FormGroup className="mt-2">
              <Input
                type="textarea"
                name="question"
                placeholder="Write your question here"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                name="question"
                placeholder="Marks of Question"
              />
            </FormGroup>
            <Input placeholder="Select Type" type="select">
              <option value="mcq">Multiple Choice</option>
              <option value="short">Short Answer</option>
              <option value="trueFalse">True/False</option>
            </Input>
          </Form>
        </CardBody>
      </Card>
    </Formik>
  );
}
