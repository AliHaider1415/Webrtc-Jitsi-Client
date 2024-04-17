import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Assesments from "./components/Assesments";
import userAuthStore from "./store/userAuthStore/userAuthStore";
function App() {
  const user = userAuthStore((state) => state.user); // get the user from the store
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/assesments" element={<Assesments />} />
            <Route
              path="/"
              element={
                localStorage.getItem("access") !== null ? (
                  <Home />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
