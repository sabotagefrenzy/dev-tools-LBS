
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
import Base64 from "./Components/Tools Page/Base64";
import ColorPicker from "./Components/Tools Page/ColorPicker";
import LoremIpsum from "./Components/Tools Page/LoremIpsum";
import RandomDataGenerator from "./Components/Tools Page/RandomDataGenerator/RandomDataGenerator";



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
        <Route path="/base-64" element={<Base64/>}/>
        <Route path="/color-picker" element={<ColorPicker/>}/>
        <Route path="/lorem-ipsum" element={<LoremIpsum/>}/>
        <Route path="/data-generator" element={<RandomDataGenerator/>}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
