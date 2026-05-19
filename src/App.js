import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import AdminLogin from "./components/AdminLogin";
import Header from "./components/Header";
import Work from "./components/Work";
import AppNavbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import StudentForm from "./components/StudentForm";
import Services from "./components/Services";
import Privacy from "./components/Privacy";
import TermsConditions from "./components/TermsConditions";
import AdminDashboard from "./components/AdminDashboard";
import AdminContact from "./components/AdminContact";
import AdminStdReq from "./components/AdminStdReq";
import Price from "./components/Price";
import WhyChoose from "./components/WhyChoose";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
          <Route path="/admincontact" element={<AdminContact/>} />
          <Route path="/adminstdreq" element={<AdminStdReq/>} />
          <Route path="/ourwork" element={<Work/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/studentform" element={<StudentForm/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/terms" element={<TermsConditions/>} />
          <Route path="/price" element={<Price/>} />
          <Route path="/whychooseus" element={<WhyChoose/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
