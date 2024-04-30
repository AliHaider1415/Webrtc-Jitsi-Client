import React from "react";
import styles from "../../../utils/styles";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import AssessmentInfoBox from "../../../components/company-assessments/AssessmentInfoBox";
import { useQuery } from "@tanstack/react-query";
import url from "../../../utils/api";
import auth from "../../../utils/helper";
import axios from "axios";

export default function AllAssessmentCompany() {
  //fetching data
  const fetchAssessments = async () => {
    try {
      const protocol = window.location.protocol;
      const response = await axios.get(
        `${protocol}//${url}/assessment/create-assessment`,
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
  //fetching data
  const {
    isPending,
    error,
    data: assessments,
  } = useQuery({
    queryKey: ["assessments"],
    queryFn: fetchAssessments,
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
      <Container className="d-flex justify-content-center flex-wrap">
        {assessments.length > 0 ? (
          assessments.map((assessment) => (
            <div className="mx-2">
              {" "}
              <AssessmentInfoBox key={assessment.id} assessment={assessment} />
            </div>
          ))
        ) : (
          <h1 style={styles.descriptionColor}>
            No Assessments under your company
          </h1>
        )}
      </Container>
    </div>
  );
}
