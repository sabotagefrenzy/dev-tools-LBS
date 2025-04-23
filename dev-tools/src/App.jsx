
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import HomePage from "./Components/Home Page/HomePage";
import About from "./Components/AboutPage"; 
import Contact from "./Components/ContactPage"; 
import Footer from "./Components/Footer";
import EditGroups from "./Components/Groups Page/EditGroups";
import ApiTool from "./Components/Tools Page/apitool";

import PasswordGenerator from "./Components/Tools Page/PasswordGenerator";



const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/edit-group" element={<EditGroups/>} />
        <Route path="/api-tool" element={<ApiTool/>} />
        <Route path="/pass-generator" element={<PasswordGenerator/>}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
