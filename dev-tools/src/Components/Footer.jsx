import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#10002B] border-t  py-10 px-10 text-center text-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-1 md:mb-0 text-xl font-medium text-white">
          <span >Last Bench Scholar</span> &copy; {new Date().getFullYear()}
        </div>
        <div className="text-lg text-white">
            <Link to="/home" className="hover:underline mx-2">Home</Link>
            <Link to="/about" className="hover:underline mx-2">About</Link>
            <Link to="/contact" className="hover:underline mx-2">Contact</Link>
        </div>
        <div className="flex space-x-6 text-2xl text-white">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
