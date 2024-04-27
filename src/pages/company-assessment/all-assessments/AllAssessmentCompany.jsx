import React from "react";
import styles from "../../../utils/styles";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import AssessmentInfoBox from "../../../components/company-assessments/AssessmentInfoBox";
import { useQuery } from "@tanstack/react-query";
import url from "../../../utils/api";

export default function AllAssessmentCompany() {
  //token
  let i =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MjQwNTg2LCJpYXQiOjE3MTQyMzY5ODYsImp0aSI6IjRjNzUwY2JkMmY4MzRlMzc5MmQxM2RjYWJjMDMwYzQ0IiwidXNlcl9pZCI6N30.m9aXhRJESRcVa7NHx5cCDqgQgds49NcYwWaCauKzVnI";

  //fetching data
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
            Authorization: `Bearer  ${i}`,
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
      {console.log(assessments)}
      <h1 className="text-center fw-bold mt-2" style={styles.descriptionColor}>
        Assessments under your Company
      </h1>
      <Link
        to="/company/create-assessment"
        className="d-flex justify-content-center"
      >
        <Button style={styles.primaryButton}>Create new Assessment</Button>
      </Link>
      <Container className="d-flex justify-content-between flex-wrap">
        {assessments.length > 0 &&
          assessments.map((assessment) => (
            <AssessmentInfoBox key={assessment.id} assessment={assessment} />
          ))}
      </Container>
    </div>
  );
}
