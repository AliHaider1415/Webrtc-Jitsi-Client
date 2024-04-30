import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "reactstrap";
import axios from "axios";
import url from "../../../utils/api";
import authtoken from "../../../utils/helper";
import styles from "../../../utils/styles";
import AttemptedAssessmentInfoBox from "../../../components/job-seeker-assesment/AttemptedAssessmentInfoBox";
export default function AllAttemptedAssessmentJobSeeker() {
  let id = 1;
  const fetchAssessmentsCandidate = async () => {
    try {
      const protocol = window.location.protocol;
      const response = await axios.get(
        `${protocol}//${url}/assessment/create-answers`,
        {
          headers: {
            Authorization: `Bearer ${authtoken.auth2}`,
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

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["assessments", id],
    queryFn: fetchAssessmentsCandidate,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error in {error.message}</div>;

  return (
    <div>
      <h1 className="text-center fw-bold mt-2" style={styles.descriptionColor}>
        All My Assessments
      </h1>
      <Container className="d-flex align-items-center justify-content-center">
        {data.assessments.length > 0 ? (
          <Container className="d-flex justify-content-center flex-wrap  ">
            {data.assessments.map((assessment) => (
              <div className="mx-3">
                <AttemptedAssessmentInfoBox
                  key={assessment.id}
                  assessment={assessment}
                />
              </div>
            ))}
          </Container>
        ) : (
          <h1 className="fw-bold text-center my-2">
            No Attempted Assessments of you
          </h1>
        )}
      </Container>
    </div>
  );
}
