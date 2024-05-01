import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userAuthStore from "./store/userAuthStore/userAuthStore";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/authentication/Login/Login";
import SignUp from "./pages/authentication/SignUp/SignUp";
import { CompanyRoute, JobSeekerRoute } from "./routes/RouteCategories";
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

function App() {
  const user = userAuthStore((state) => state.user);
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Layout>
            <Routes>
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
                path="/company/view-assessments/:id"
                element={
                  <CompanyRoute user={user}>
                    element={<AssessmentEditPage />}
                  </CompanyRoute>
                }
              />
              <Route
                path="/company/create-assessment"
                element={
                  <CompanyRoute user={user}>
                    element={<CreateAssessment />}
                  </CompanyRoute>
                }
              />
              {/* Candidate Routes */}
              <Route
                path="/candidate/all-assessments"
                element={
                  <JobSeekerRoute user={user}>
                    element={<AllAssessmentJobSeeker />}
                  </JobSeekerRoute>
                }
              />
              <Route
                path="/candidate/attempt-assessment/:id"
                element={
                  <JobSeekerRoute user={user}>
                    element={<AttemptAssessmentPage />}
                  </JobSeekerRoute>
                }
              />
              <Route
                path="/candidate/my-attempted-assessments"
                element={
                  <JobSeekerRoute user={user}>
                    element={<AllAttemptedAssessmentJobSeeker />}
                  </JobSeekerRoute>
                }
              />
              <Route
                path="/candidate/result-assessments/:id"
                element={
                  <JobSeekerRoute user={user}>
                    element={<ResultAssessmentPage />}
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
            </Routes>
          </Layout>

          <ToastContainer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
