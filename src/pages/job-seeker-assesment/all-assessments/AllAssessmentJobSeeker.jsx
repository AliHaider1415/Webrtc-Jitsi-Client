import React from "react";
import styles from "../../../utils/styles";
import AssessmentInfoBox from "../../../components/job-seeker-assesment/AssessmentInfoBox";
import { Container, Row, Col } from "reactstrap";
import assessments from "../../../utils/assessments";
import { useQuery } from "@tanstack/react-query";
import url from "../../../utils/api";
import auth from "../../../utils/helper";
export default function AllAssessmentJobSeeker() {
  const {
    isPending,
    error,
    data: assessments,
  } = useQuery({
    queryKey: ["assessments"],
    queryFn: async () => {
      const protocol = window.location.protocol;
      const response = await fetch(
        `${protocol}//${url}/assessment/create-assessment`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer  ${auth}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch assessments");
      }
      return response.json();
    },
  });

  if (isPending) return <div> Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;
  return (
    <div>
      <h1 className="text-center fw-bold mt-2" style={styles.descriptionColor}>
        All My Assessments
      </h1>
      <Container className="text-center d-flex align-items-center">
        <Container className="d-flex justify-content-between flex-wrap  ">
          {assessments.map((assessment) => (
            <AssessmentInfoBox assessment={assessment} />
          ))}
        </Container>
      </Container>
    </div>
  );
}
