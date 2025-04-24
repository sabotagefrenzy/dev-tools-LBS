import React, { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import "./HomePage.css";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteTools, setFavoriteTools] = useState([]);

  // Fetch favorite tools from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteTools")) || [];
    setFavoriteTools(storedFavorites);
  }, [localStorage.getItem("favoriteTools")]);  // Add the dependency on localStorage
  

  const displayedTools = [
    {
      title: 'API Tool',
      description: 'A simple and powerful tool to test, manage, and document APIs built for developers and teams to streamline their workflow.',
      path: '/api-tool',
      group: 'API',
    },
    {
      title: 'Password Generator',
      description: 'The Password Generator is a secure and customizable tool that helps developers easily create strong, unique passwords for their applications.',
      path: '/pass-generator',
      group: 'Utilities',
    },
    {
      title: 'Base64 Encoder And Decoder',
      description: 'Easily encode or decode Base64 data with a fast, reliable tool designed for developers and data professionals.',
      path: '/base-64',
      group: 'Utilities',
    },
    {
      title: 'Color Picker',
      description: 'The Image Color Picker lets you easily extract and get color codes (HEX, RGB, HSL) from an image for seamless integration into your projects.',
      path: '/color-picker',
      group: 'Utilities',
    },
    {
      title: 'Lorem Ipsum Generator',
      description: 'Generate custom-length placeholder text instantly with our Lorem Ipsum Generator—perfect for designing layouts and testing content spacing.',
      path: '/lorem-ipsum',
      group: 'Utilities',
    },
    {
      title: 'Random Data Generator',
      description: 'Generate realistic sample data instantly with our Random Data Generator—perfect for testing, development, and design mockups.',
      path: '/data-generator',
      group: 'Utilities',
    },
  ];

  // Filter logic
  const filterTools = () => {
    let filtered = displayedTools.map((tool) => ({
      ...tool,
      isFavourite: favoriteTools.includes(tool.title),
    }));

    if (activeTab === "Favourites") {
      filtered = filtered.filter((tool) => tool.isFavourite);
    }

    if (activeTab === "Groups") {
      const storedGroups = JSON.parse(localStorage.getItem("toolGroups")) || {};
      filtered = Object.entries(storedGroups).map(([groupName, tools]) => ({
        title: groupName,
        description: tools.map(tool => tool.title).join(", "),
        path: `/group/${groupName}`, 
      }));
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((tool) =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTools = filterTools();

  return (
    <div className="min-h-screen bg-[#10002B] font-sans">
      <NavigationBar className="" />

      <section className="px-16 pt-30 pb-10">
        <h2 className="text-6xl font-semibold mb-2 text-white">
          A ToolBench for all your <br />
          <span className="font-bold text-6xl text-[#00c8a0]">development Tools.</span>
        </h2>
        <p className="text-2xl max-w-3xl mt-4 text-[#C3B1FF]">
          Supercharge your workflow with our free developer toolkit — a curated set of essential tools built to simplify your coding journey. Clean, fast, and straight from the Last Bench.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex justify-between items-center px-18 mb-6 flex-wrap gap-4">
        <div className="flex space-x-4 text-xl font-medium">
          {['All', 'Favourites', 'Groups'].map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? 'underline text-[#ffffff]' : 'text-[#00c8a0]'
              } underline-offset-4`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-85">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Search tools"
            className="pl-10 pr-4 py-2 border rounded-md shadow-sm text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#7F5AF0] bg-[#C3B1FF] text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tool Cards */}
      <div className="px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-15 gap-y-15 pb-10">
        {filteredTools.map((tool, index) => (
          <Link to={tool.path} key={index}>
            <div className="flip-card rounded-2xl p-4 backdrop-blur shadow-md hover:shadow-lg transition duration-300">
              <div className="flip-card-inner">
                <div className="flip-card-front text-center">
                  <span className="text-[#00c8a0] text-3xl font-sans font-bold">
                    {tool.title}
                  </span>
                </div>
                <div className="flip-card-back text-mg font-semibold text-white">
                  <p>{tool.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {filteredTools.length === 0 && (
          <p className="text-sm text-gray-400 col-span-full text-center">
            No tools found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
