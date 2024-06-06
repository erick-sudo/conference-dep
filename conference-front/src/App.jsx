import { useState } from "react";
import "./App.css";
import About from "./components/About";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Error404Page from "./components/Error404Page";
import ConferenceDetail from "./components/ConferenceDetail";
import Conferences from "./components/Conferences";
import Admin from "./components/dashboard/Admin";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Reports } from "./components/dashboard/Reports";
import { Background } from "./components/common/dottedbg";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col fixed inset-0">
      { !pathname.includes("admin") && <NavBar /> }
      <div className="relative flex-grow">
        <div className="routing flex flex-col absolute inset-0 overflow-y-scroll">
          <div className="flex-grow">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/conference/:id" element={<ConferenceDetail />} />
              <Route path="/conferences" element={<Conferences />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={<Error404Page />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reports" element={<div className="relative">
                <Background />
                <Reports />
              </div>} />
            </Routes>
          </div>
          { !pathname.includes("admin") && <Footer /> }
        </div>
      </div>
    </div>
  );
}

export default App;
