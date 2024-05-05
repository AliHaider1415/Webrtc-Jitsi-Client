import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AttemptAssessmentQuestions from "../../../components/job-seeker-assesment/AttemptAssessmentQuestions";
import url from "../../../utils/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "../../../utils/styles";
export default function AttemptAssessmentPage() {
  const { id } = useParams();

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

  return (
    <>
      {assessment &&
        (assessment.length !== 0 ? (
          <AttemptAssessmentQuestions assessment={assessment[0]} />
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
