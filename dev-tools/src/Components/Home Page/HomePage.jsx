import React, { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import "./HomePage.css";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteTools, setFavoriteTools] = useState([]);

  // Fetch favorites on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteTools")) || [];
    setFavoriteTools(storedFavorites);
  }, []);

  // Tool data with navigation paths
  const displayedTools = [
    {
      title: 'API Tool',
      description: 'A tool to test and interact with various APIs.',
      path: '/api-tool',
      group: 'API',
    },
    {
      title: 'Password Generator',
      description: 'Generate strong passwords with customizable options.',
      path: '/pass-generator',
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
      // Fetch the groups data and map it correctly
      const storedGroups = JSON.parse(localStorage.getItem("toolGroups")) || {};
      filtered = Object.entries(storedGroups).map(([groupName, tools]) => ({
        title: groupName,
        description: tools.map(tool => tool.title).join(", "),
        path: `/group/${groupName}`, // Route to the group's page
      }));
    }

    // Filter tools by search term
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
      <NavigationBar className="text-white" />

      <section className="px-16 pt-30 pb-10">
        <h2 className="text-5xl font-semibold mb-2 text-white">
          A ToolBench for all your <br />
          <span className="font-bold text-5xl text-[#00c8a0]">development Tools.</span>
        </h2>
        <p className="text-xl max-w-2xl mt-4 text-[#C3B1FF]">
          Supercharge your workflow with our free developer toolkit — a curated set of essential tools built to simplify your coding journey. Clean, fast, and straight from the Last Bench.
        </p>
      </section>

      {/* Tabs and Search */}
      <div className="flex justify-between items-center px-16 mb-6 flex-wrap gap-4">
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
        <div className="relative w-64">
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
      <div className="px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-20 pb-10">
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
