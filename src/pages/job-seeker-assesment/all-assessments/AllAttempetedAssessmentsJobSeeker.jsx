import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "reactstrap";
import axios from "axios";
import url from "../../../utils/api";
import styles from "../../../utils/styles";
import AttemptedAssessmentInfoBox from "../../../components/job-seeker-assesment/AttemptedAssessmentInfoBox";

export default function AllAttemptedAssessmentJobSeeker() {
  const fetchAssessmentsCandidate = async () => {
    try {
      const protocol = window.location.protocol;
      const response = await axios.get(
        `${protocol}//${url}/assessment/create-answers`,
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
      throw new Error("Failed to fetch assessments");
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["assessments"],
    queryFn: fetchAssessmentsCandidate,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error in {error.message}</div>;

  return (
    <div>
      <h1 className="text-center fw-bold mt-2" style={styles.descriptionColor}>
        Attempted Assessments
      </h1>
      <Container className="d-flex align-items-center justify-content-center">
        {data && data.assessments && (
          <Container className="d-flex justify-content-center flex-wrap">
            {data.assessments.map((assessment) => (
              <div className="mx-3" key={assessment.id}>
                <AttemptedAssessmentInfoBox assessment={assessment} />
              </div>
            ))}
          </Container>
        )}
      </Container>
    </div>
  );
}
