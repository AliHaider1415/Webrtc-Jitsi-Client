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
    Card,
    CardBody,
    CardTitle,
    CardText,
  } from "reactstrap";

  export default function CreateAssessment() {
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
      setQuestions([...questions, { type: "", question: "", options: [] }]);
    };

    const handleQuestionChange = (index, e) => {
      const { name, value } = e.target;
      const updatedQuestions = [...questions];
      updatedQuestions[index][name] = value;
      setQuestions(updatedQuestions);
    };

    const addOption = (index) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index].options.push("");
      setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, e) => {
      const { value } = e.target;
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      setQuestions(updatedQuestions);
    };

    return (
      <Container className="py-4">
        <h1 className="mb-4">Create Assessment</h1>
        <Button color="primary" className="mb-4" onClick={addQuestion}>
          Add Question
        </Button>
        {questions.map((question, index) => (
          <Card key={index} className="mb-4">
            <CardBody>
              <CardTitle>Question {index + 1}</CardTitle>
              <Form>
                <FormGroup>
                  <Label for={`question${index}`}>Question</Label>
                  <Input
                    type="text"
                    name="question"
                    id={`question${index}`}
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for={`questionType${index}`}>Type</Label>
                  <Input
                    type="select"
                    name="type"
                    id={`questionType${index}`}
                    value={question.type}
                    onChange={(e) => handleQuestionChange(index, e)}
                  >
                    <option value="">Select Type</option>
                    <option value="mcq">Multiple Choice</option>
                    <option value="short">Short Answer</option>
                    <option value="trueFalse">True/False</option>
                  </Input>
                </FormGroup>
                {question.options &&
                  question.options.map((option, optionIndex) => (
                    <FormGroup key={optionIndex}>
                      <Label for={`option${index}${optionIndex}`}>
                        Option {optionIndex + 1}
                      </Label>
                      <Input
                        type="text"
                        name={`option${index}${optionIndex}`}
                        id={`option${index}${optionIndex}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e)
                        }
                      />
                    </FormGroup>
                  ))}
                {question.type === "mcq" && (
                  <Button color="info" onClick={() => addOption(index)}>
                    Add Option
                  </Button>
                )}
              </Form>
            </CardBody>
          </Card>
        ))}
      </Container>
    );
  }
