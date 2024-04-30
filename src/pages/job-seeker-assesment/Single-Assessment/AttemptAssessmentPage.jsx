import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AttemptAssessmentQuestions from "../../../components/job-seeker-assesment/AttemptAssessmentQuestions";
import ResultAssessmentQuestions from "../../../components/job-seeker-assesment/ResultAssessmentQuestions";
import url from "../../../utils/api";
import auth from "../../../utils/helper";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
export default function AttemptAssessmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitAnswers = useMutation({
    mutationFn: (values) => {
      console.log(values);
      const protocol = window.location.protocol;
      return axios.post(
        `${protocol}//${url}/assessment/create-answers`,
        {
          assessment_pk: values.assessment_pk,
          answers: values.answers,
        },

        {
          headers: {
            Authorization: `Bearer ${auth.auth2}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const fetchAssessment = async () => {
    try {
      const protocol = window.location.protocol;
      const response = await axios.get(
        `${protocol}//${url}/assessment/get-assessment/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${auth.auth2}`,
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
    isError,
    data: assessment,
  } = useQuery({
    queryKey: ["assessment"],
    queryFn: fetchAssessment,
  });

  if (isError) {
    toast.error("Failed to fetch assessment");
    console.log("Error");
  }
  if (isPending) {
    return <>Loading....</>;
  }

  const submitAssessment = () => {
    submitAnswers.mutate({ answers: answers, assessment_pk: assessment[0].id });
  };
  const addAnswers = (answer, index) => {
    let updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  return (
    <>
      {assessment && (
        <AttemptAssessmentQuestions
          assessment={assessment[0]}
          submitAssessment={submitAssessment}
          addAnswers={addAnswers}
        />
      )}
    </>
  );
}
