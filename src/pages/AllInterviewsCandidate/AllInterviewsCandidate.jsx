import React from "react";
import styles from "../../utils/styles";
import { Container } from "reactstrap";
import CompanyInterviewBox from "../../components/Interview-Company/CompanyInterviewBox";
import CandidateInterviewBox from "../../components/Interview-Candidate/CandidateInterviewBox";

export default function AllInterviewsCandidate() {
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
