import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AttemptAssessmentQuestions from "../../../components/job-seeker-assesment/AttemptAssessmentQuestions";
import ResultAssessmentQuestions from "../../../components/job-seeker-assesment/ResultAssessmentQuestions";

export default function AttemptAssessmentPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitAssessment = () => {
    toast.success("Assessment Submitted Successfully");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
    setIsSubmitted(true);
    console.log(answers);
  };
  const addAnswers = (answer, index) => {
    let updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const { id } = useParams();
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
        answer_text: "",
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
        answer_text: "",
        assessment: 1,
      },
      {
        id: 3,
        options: [],
        question_desc: "What does JSX stand for?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text: "",
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
        answer_text: "",
        assessment: 1,
      },
      {
        id: 5,
        options: [],
        question_desc: "What are React Hooks?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text: "",
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
        answer_text: "",
        assessment: 1,
      },
      {
        id: 7,
        options: [],
        question_desc: "What is JSX?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text: "",
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
        answer_text: "",
        assessment: 1,
      },
      {
        id: 9,
        options: [],
        question_desc: "What is a React component?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text: "",
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
        answer_text: "",
        assessment: 1,
      },
    ],
    title: "React Developer Test",
    description: "Test your knowledge of React.js with this assessment.",
    total_points: 20,
    company: "ReactTech",
  };

  let result = {
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
        user_answer: "React", // Correct answer
        scored_points: 2, // Full points for correct answer
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
        user_answer: "True", // Correct answer
        scored_points: 2, // Full points for correct answer
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
        user_answer: "JavaScript Extended", // Wrong answer
        scored_points: 0, // Zero points for wrong answer
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
        user_answer: "HTML", // Wrong answer
        scored_points: 0, // Zero points for wrong answer
      },
      {
        id: 5,
        options: [],
        question_desc: "What are React Hooks?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text:
          "Functions that let you use state and other React features without writing a class",
        assessment: 1,
        user_answer: "Functions to hang your coat on", // Wrong answer
        scored_points: 0, // Zero points for wrong answer
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
        user_answer: "Functional", // Wrong answer
        scored_points: 0, // Zero points for wrong answer
      },
      {
        id: 7,
        options: [],
        question_desc: "What is JSX?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text: "JavaScript XML",
        assessment: 1,
        user_answer: "JavaScript XML", // Correct answer
        scored_points: 2, // Full points for correct answer
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
        user_answer: "State", // Correct answer
        scored_points: 2, // Full points for correct answer
      },
      {
        id: 9,
        options: [],
        question_desc: "What is a React component?",
        question_type: "Short",
        question_point: 2,
        number_of_options: 0,
        answer_text: "A piece of UI",
        assessment: 1,
        user_answer: "A UI element", // Partially correct answer
        scored_points: 1, // Partial points for partially correct answer
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
        user_answer: "Yes", // Correct answer
        scored_points: 2, // Full points for correct answer
      },
    ],
    title: "React Developer Test",
    description: "Test your knowledge of React.js with this assessment.",
    total_points: 20,
    company: "ReactTech",
    obtained_points: 13,
  };

  return isSubmitted ? (
    <ResultAssessmentQuestions result={result} />
  ) : (
    <AttemptAssessmentQuestions
      assessment={assessment}
      submitAssessment={submitAssessment}
      addAnswers={addAnswers}
    />
  );
}
