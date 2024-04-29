import React from "react";
import styles from "../../../utils/styles";
import AssessmentInfoBox from "../../../components/job-seeker-assesment/AssessmentInfoBox";
import { Container, Row, Col } from "reactstrap";

import { useQuery } from "@tanstack/react-query";
import url from "../../../utils/api";
import authtoken from "../../../utils/helper";
import axios from "axios";

export default function AllAssessmentJobSeeker() {
  const fetchAssessments = async () => {
    const protocol = window.location.protocol;
    const response = await axios.get(
      `${protocol}//${url}/assessment/create-answers`,

      {
        headers: {
          Authorization: `Bearer ${authtoken.auth2}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(axios.error);
    }

    return response.data;
  };
  const {
    isPending,
    error,
    isSuccess,
    data: assessments,
  } = useQuery({
    queryKey: ["assessments"],
    queryFn: fetchAssessments,
  });
  if (isPending) return <div> Loading....</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;
  if (isSuccess)
    return (
      <div>
        {/* <h1
          className="text-center fw-bold mt-2"
          style={styles.descriptionColor}
        >
          All My Assessments
        </h1>
        <Container className="text-center d-flex align-items-center">
          <Container className="d-flex justify-content-between flex-wrap  ">
            {assessments.map((assessment) => (
              <AssessmentInfoBox assessment={assessment} />
            ))}
          </Container>
        </Container>{" "}
        * */}
        {console.log(assessments)}
      </div>
    );
}
