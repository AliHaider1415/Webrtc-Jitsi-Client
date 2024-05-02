import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AttemptAssessmentQuestions from "../../../components/job-seeker-assesment/AttemptAssessmentQuestions";
import url from "../../../utils/api";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import styles from "../../../utils/styles";
export default function AttemptAssessmentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);

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
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      setTimeout(() => {
        navigate(`/candidate/result-assessments/${id}`);
      }, 2000);
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
            Authorization: `Bearer ${localStorage.getItem("access")}`,
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

    isError,
    data: assessment,
  } = useQuery({
    queryKey: ["assessment", id],
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
      {assessment &&
        (assessment.length !== 0 ? (
          <AttemptAssessmentQuestions
            assessment={assessment[0]}
            submitAssessment={submitAssessment}
            addAnswers={addAnswers}
          />
        ) : (
          <h1
            className="fw-bold my-3 text-center"
            style={styles.descriptionColor}
          >
            You have attempted this assessment.You cannot re-attempt this.
          </h1>
        ))}
    </>
  );
}
