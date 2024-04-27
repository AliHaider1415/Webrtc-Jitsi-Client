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
import SingleAssessmentJobSeeker from "./pages/job-seeker-assesment/Single-Assessment/AttemptAssessmentPage";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AttemptAssessmentPage from "./pages/job-seeker-assesment/Single-Assessment/AttemptAssessmentPage";
import { FadeLoader } from "react-spinners";
import loaderStore from "./store/loaderStore/loaderStore";
import AssessmentEditPage from "./pages/company-assessment/all-assessments/AssessmentEditPage";
function App() {
  const user = userAuthStore((state) => state.user);
  const loading = loaderStore((state) => state.loader);
  return (
    <div className="App">
      {" "}
      <header className="App-header">
        <BrowserRouter>
          {/* <ToastContainer /> */}
          <Layout>
            <Routes>
              {/* ---------------------------------------- */}
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />4
              {/* ---For temmporary all paths i set to public------------------------------------- */}
              <Route
                path="/company/create-assessment"
                element={<CreateAssessment />}
              />
              <Route
                path="/candidate/all-assessments"
                element={<AllAssessmentJobSeeker />}
              />
              <Route
                path="/candidate/attempt-assessment/:id"
                element={<AttemptAssessmentPage />}
              />
              <Route
                path="/company/company-assessments"
                element={<AllAssessmentCompany />}
              />
              <Route
                path="/company/view-assessments/:id"
                element={<AssessmentEditPage />}
              />
              {/* <Route

                path="/candidate/all-assessments/:id"
                element={
                  <JobSeekerRoute user={user}>
                    <SingleAssessmentJobSeeker />
                  </JobSeekerRoute>
                }
              /> */}
              {/* ---------------------------------------- */}
              {/* Public Available Routes */}
              <Route path="/" element={<LandingPage />} />
              {/* ---------------------------------------- */}
              {/* CompanyRoutes */}
              {/* Compnay will get its all assesments title and details in this page but not open a particular assesment */}
              {/* <Route
                path="/company/company-assessments"
                element={
                  <CompanyRoute user={user}>
                    <AllAssessmentCompany />
                  </CompanyRoute>
                }
              /> */}
              {/* Compant will open a particular assesment to view  */}
              <Route
                path="/company/company-assessments/:id"
                element={
                  <CompanyRoute user={user}>
                    <SingleAssessmentCompany />
                  </CompanyRoute>
                }
              />
              {/* Company will create a new assesment */}
              {/* <Route
                path="/company/create-assessment"
                element={
                  <CompanyRoute user={user}>
                    <CreateAssessment />
                  </CompanyRoute>
                }
              /> */}
              {/* ---------------------------------------- */}
              {/* JobSeeker Routes */}
              {/* Candidate will get all assesments from here  */}
              {/* <Route
                path="/candidate/all-assessments"
                element={
                  <JobSeekerRoute user={user}>
                    <AllAssessmentJobSeeker />
                  </JobSeekerRoute>
                }
              /> */}
              {/* Candidate will open a particular assesment to view  and attempt */}
              <Route
                path="/candidate/all-assessments/:id"
                element={
                  <JobSeekerRoute user={user}>
                    <SingleAssessmentJobSeeker />
                  </JobSeekerRoute>
                }
              />
            </Routes>
          </Layout>
          {
            <FadeLoader
              aria-label="Loading Spinner"
              data-testid="loader"
              loading={loading}
              className="text-center"
            />
          }

          <ToastContainer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
