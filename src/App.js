import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userAuthStore from "./store/userAuthStore/userAuthStore";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/authentication/Login/Login";
import SignUp from "./pages/authentication/SignUp/SignUp";
import {
  CommonRoute,
  CompanyRoute,
  JobSeekerRoute,
} from "./routes/RouteCategories";
import AllAssessmentCompany from "./pages/company-assessment/all-assessments/AllAssessmentCompany";
import SingleAssessmentCompany from "./pages/company-assessment/Single-Assessment/SingleAssessmentCompany";
import CreateAssessment from "./pages/company-assessment/create-assessment/CreateAssessment";
import AllAssessmentJobSeeker from "./pages/job-seeker-assesment/all-assessments/AllAssessmentJobSeeker";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllAttemptedAssessmentJobSeeker from "./pages/job-seeker-assesment/all-assessments/AllAttempetedAssessmentsJobSeeker";
import "./App.css";
import AttemptAssessmentPage from "./pages/job-seeker-assesment/Single-Assessment/AttemptAssessmentPage";
import AssessmentEditPage from "./pages/company-assessment/all-assessments/AssessmentEditPage";
import ResultAssessmentPage from "./pages/job-seeker-assesment/all-assessments/ResultAssessmentPage";
import Lobby from "./pages/screens/Lobby";
import AllInterviewsCandidate from "./pages/AllInterviewsCandidate/AllInterviewsCandidate";
import Room from "./pages/screens/Room";
import AllInterviewsCompany from "./pages/AllInterviewsCompany/AllInterviewsCompany";
import InterviewRoom from "./pages/InterviewRoom/InterviewRoom";

function App() {
  const user = userAuthStore((state) => state.user);
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/room" element={<Room />} />
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />

              {/* Company Routes */}
              <Route
                path="/company/company-assessments"
                element={
                  <CompanyRoute user={user}>
                    <AllAssessmentCompany />
                  </CompanyRoute>
                }
              />

              <Route
                path="/company/all-interviews"
                element={
                  <CompanyRoute user={user}>
                    <AllInterviewsCompany />
                  </CompanyRoute>
                }
              />
              <Route
                path="/company/view-assessments/:id"
                element={
                  <CompanyRoute user={user}>
                    <AssessmentEditPage />
                  </CompanyRoute>
                }
              />
              <Route
                path="/company/create-assessment"
                element={
                  <CompanyRoute user={user}>
                    <CreateAssessment />
                  </CompanyRoute>
                }
              />

              {/* Candidate Routes */}
              <Route
                path="/candidate/all-assessments"
                element={
                  <JobSeekerRoute user={user}>
                    <AllAssessmentJobSeeker />
                  </JobSeekerRoute>
                }
              />
              <Route
                path="/candidate/all-interviews"
                element={
                  <JobSeekerRoute user={user}>
                    <AllInterviewsCandidate />
                  </JobSeekerRoute>
                }
              />
              <Route
                path="/candidate/attempt-assessment/:id"
                element={
                  <JobSeekerRoute user={user}>
                    <AttemptAssessmentPage />
                  </JobSeekerRoute>
                }
              />
              <Route
                path="/candidate/my-attempted-assessments"
                element={
                  <JobSeekerRoute user={user}>
                    <AllAttemptedAssessmentJobSeeker />
                  </JobSeekerRoute>
                }
              />
              <Route
                path="/candidate/result-assessments/:id"
                element={
                  <JobSeekerRoute user={user}>
                    <ResultAssessmentPage />
                  </JobSeekerRoute>
                }
              />
              <Route
                path="/company/company-assessments/:id"
                element={
                  <CompanyRoute user={user}>
                    <SingleAssessmentCompany />
                  </CompanyRoute>
                }
              />
              {/* Common Routes */}
              <Route
                path="/room/interview/:id"
                element={
                  <CommonRoute user={user}>
                    <InterviewRoom />
                  </CommonRoute>
                }
              />
            </Routes>
          </Layout>

          <ToastContainer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
