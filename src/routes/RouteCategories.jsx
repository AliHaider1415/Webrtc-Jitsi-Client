import React from "react";
import { Navigate } from "react-router-dom";

export const JobSeekerRoute = ({ user, children }) => {
  return user === "JobSeeker" ? children : <Navigate to="/" />;
};

export const CompanyRoute = ({ user, children }) => {
  return user === "Employer" ? children : <Navigate to="/" />;
};

export const TrainerRoute = ({ user, children }) => {
  return user === "Trainer" ? children : <Navigate to="/" />;
};

export const CommonRoute = ({ user, children }) => {
  return user === "Employer" || user === "JobSeeker" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};
