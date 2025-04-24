import React, { useState } from "react";
import NavigationBar from "./NavigationBar";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-105"
        style={{ backgroundImage: "url('Images/bg-image.png')" }} 
      ></div>

      {/* Main Content */}
      <div className="relative z-10">
        <NavigationBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl w-full mx-auto py-16 items-center">
            {/* Left Section */}
            <div className="flex flex-col justify-center items-center w-full space-y-5">
              <div className="">
                <h2 className="text-7xl font-bold text-center text-[#C3B1FF] mb-6">
                  Contact Us
                </h2>
                <p className="text-4xl text-center font-medium text-[#00c8a0] max-w-3xl">
                  Let us know what you need and we will get back to you in no time.
                </p>
              </div>
            </div>

            {/* Right Form Section */}
            <form
                onSubmit={handleSubmit}
                className="bg-[#10002b]/90 backdrop-blur-md px-12 py-10 rounded-2xl shadow-2xl w-full max-w-3xl space-y-6 border border-gray-200"
              >

              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm text-[#f7ebff] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="px-4 py-2 rounded-md bg-gray-100 text-black"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm text-[#f7ebff] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="px-4 py-2 rounded-md bg-gray-100 text-black"
                  placeholder="Email Id"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-sm text-[#f7ebff] mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="px-4 py-2 rounded-md bg-gray-100 text-black resize-none"
                  rows="4"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#7149D4] text-white px-6 py-2 rounded-md hover:bg-[#977BE0] transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
