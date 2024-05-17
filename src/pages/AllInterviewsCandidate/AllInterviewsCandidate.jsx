import React from "react";
import styles from "../../utils/styles";
import { Container } from "reactstrap";
import CandidateInterviewBox from "../../components/Interview-Candidate/CandidateInterviewBox";
import url from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AllInterviewsCandidate() {
  //   const fetchInterviewsCandidate = async () => {
  //     try {
  //       const protocol = window.location.protocol;
  //       const response = await axios.get(
  //         `${protocol}//${url}/assessment/create-answers`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("access")}`,
  //           },
  //         }
  //       );

  //       if (!response.data) {
  //         throw new Error("No data received");
  //       }

  //       return response.data;
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error("Failed to fetch interviews");
  //     }
  //   };

  //   const { isPending, isError, data, error } = useQuery({
  //     queryKey: ["interviews"],
  //     queryFn: fetchInterviewsCandidate,
  //   });

  //   if (isPending) return <div>Loading...</div>;
  //   if (isError) return <div>Error in {error.message}</div>;

  return (
    <div>
      <h1 className="text-center fw-bold my-2" style={styles.descriptionColor}>
        Interviews Scheduled For You
      </h1>

      <Container className="d-flex  justify-content-around flex-wrap my-2">
        {/* {assessments.length > 0 ? (
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
            )} */}
        <div className="mx-2 my-2">
          <CandidateInterviewBox />
        </div>
        <div className="mx-2  my-2">
          <CandidateInterviewBox />
        </div>
        <div className="mx-2 my-2">
          <CandidateInterviewBox />
        </div>

        <div className="mx-2">
          <CandidateInterviewBox />
        </div>
      </Container>
    </div>
  );
}
