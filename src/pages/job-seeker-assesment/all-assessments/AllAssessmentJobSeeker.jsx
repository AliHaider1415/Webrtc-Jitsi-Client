import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "reactstrap";
import axios from "axios";
import url from "../../../utils/api";
import authtoken from "../../../utils/helper";
import AssessmentInfoBox from "../../../components/job-seeker-assesment/AssessmentInfoBox";
import styles from "../../../utils/styles";

export default function AllAssessmentJobSeeker() {
  let id = 1;
  const fetchAssessmentsCandidate = async () => {
    try {
      const protocol = window.location.protocol;
      const response = await axios.get(
        `${protocol}//${url}/assessment/update-answers/${id}/`,
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
    queryKey: ["assessments"],
    queryFn: fetchAssessmentsCandidate,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <h1 className="text-center fw-bold mt-2" style={styles.descriptionColor}>
        All My Assessments
      </h1>
      <Container className="text-center d-flex align-items-center">
        <Container className="d-flex justify-content-center flex-wrap  ">
          {data.map((assessment) => (
            <div className="mx-3">
              <AssessmentInfoBox key={assessment.id} assessment={assessment} />
            </div>
          ))}
        </Container>
      </Container>
    </div>
  );
}
