import React from "react";
import { useParams } from "react-router-dom";

export default function AttemptAssessmentPage() {
  const { id } = useParams();

  return <div>{id} is here</div>;
}
