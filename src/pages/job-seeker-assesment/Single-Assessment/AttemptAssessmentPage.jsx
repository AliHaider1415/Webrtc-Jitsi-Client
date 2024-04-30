import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AttemptAssessmentQuestions from "../../../components/job-seeker-assesment/AttemptAssessmentQuestions";
import ResultAssessmentQuestions from "../../../components/job-seeker-assesment/ResultAssessmentQuestions";
import url from "../../../utils/api";
import auth from "../../../utils/helper";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function AttemptAssessmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);

  const fetchAssessment = async () => {
    try {
      const protocol = window.location.protocol;
      const response = await axios.get(
        `${protocol}//${url}/assessment/update-answers/${id}/`,
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

  const {
    isPending,
    error,
    isSuccess,
    data: assessment,
  } = useQuery({
    queryKey: ["assessment"],
    queryFn: fetchAssessment,
  });

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

  return (
    <AttemptAssessmentQuestions
      assessment={assessment}
      submitAssessment={submitAssessment}
      addAnswers={addAnswers}
    />
  );
}
