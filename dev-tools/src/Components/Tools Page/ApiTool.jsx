import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../NavigationBar';
import { FiHeart, FiHeart as FiHeartFilled } from "react-icons/fi";

const TOOL_KEY = 'favoriteTools'; // key for localStorage

const ApiTool = () => {
  const [selectCategory, setSelectCategory] = useState('GET');
  const [url, setUrl] = useState('');
  const [requestData, setRequestData] = useState('');
  const [responseData, setResponseData] = useState({
    statusCode: 0,
    statusText: '',
    headers: null,
    data: null,
  });
  const [responseText, setResponseText] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);

  // Load favorite state from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];
    setIsFavourite(storedFavorites.includes('API Tool'));
  }, []);

  // Toggle favorite and store it
  const toggleFavourite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];

    if (isFavourite) {
      storedFavorites = storedFavorites.filter((tool) => tool !== 'API Tool');
    } else {
      storedFavorites.push('API Tool');
    }

    localStorage.setItem(TOOL_KEY, JSON.stringify(storedFavorites));
    setIsFavourite(!isFavourite);
  };

  const stringFormatter = (str) => {
    return str
      .replace(/\n/g, ' ')
      .replace(/\r/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/'/g, '"');
  };

  const handleRequest = async () => {
    try {
      let response = null;

      if (selectCategory === 'GET') {
        response = await axios.get(url);
      } else if (selectCategory === 'POST' || selectCategory === 'PUT') {
        const formatted = stringFormatter(requestData);
        let jsonBody;

        try {
          jsonBody = JSON.parse(formatted);
        } catch (error) {
          setResponseText('Invalid JSON Input');
          setResponseData({
            statusCode: 422,
            statusText: 'Unprocessable Entity',
            headers: null,
            data: null,
          });
          return;
        }

        response =
          selectCategory === 'POST'
            ? await axios.post(url, jsonBody)
            : await axios.put(url, jsonBody);
      } else if (selectCategory === 'DELETE') {
        response = await axios.delete(url);
      }

      if (response && response.data !== null) {
        setResponseData({
          statusCode: response.status,
          statusText: response.statusText,
          headers: response.headers,
          data: response.data,
        });
        setResponseText(JSON.stringify(response.data, null, 2));
        setRequestData('');
      }
    } catch (error) {
      setResponseText(`Error: ${error.message}`);
      setResponseData({
        statusCode: 0,
        statusText: '',
        headers: null,
        data: null,
      });
    }
  };

  return (
    <div className="bg-[#10002b] min-h-screen text-[#f7ebff]">
      <NavigationBar />
      {/* Title Section */}
      <section className="pt-30 pb-15 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-6 text-[#c3b1ff]">
            Online API Tool
          </h1>
          <button onClick={toggleFavourite} className="text-2xl hover:scale-110 transition-transform">
            {isFavourite ? (
            <FiHeartFilled fill="#ff4d4d" stroke="#ff4d4d" />
            ) : (
            <FiHeart stroke="#ffffff" fill="none" />
            )}
          </button>
          
        </div>
        <p className="text-sm md:text-base leading-relaxed">
        Our Online API Tool is an easy-to-use platform that helps developers work with APIs more efficiently. Like Postman, it lets you test, manage, and document APIs all in one place. Whether you're creating or testing an API, this tool makes your job easier with a clean interface and useful features. It's great for both solo developers and teams, helping you stay organized and work faster on any project.
        </p>
      </section>

      {/* Tool Interface */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto p-6 bg-[#3a2f59] rounded-xl shadow-lg">
          <label className="block text-sm font-medium mb-2 text-[#c3b1ff]">Enter URL</label>
          <div className="flex gap-2 mb-4 flex-col md:flex-row">
            <select
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
              className="bg-[#10002b] text-[#f7ebff] border border-[#c3b1ff] rounded-lg p-2 w-full md:w-32"
            >
              {['GET', 'POST', 'PUT', 'DELETE'].map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com"
              className="flex-1 p-2 bg-[#10002b] text-[#f7ebff] border border-[#c3b1ff] rounded-lg"
            />

            <button
              onClick={handleRequest}
              className="bg-[#00c8a0] hover:bg-[#00b393] text-[#10002b] font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Send
            </button>
          </div>

          <label className="block text-sm font-medium text-[#c3b1ff] mb-1">Body</label>
          <p className="text-xs text-[#f7ebff] mb-2">Please enter the JSON body for POST and PUT requests</p>
          <textarea
            rows="7"
            value={requestData}
            onChange={(e) => setRequestData(e.target.value)}
            className="w-full p-2 bg-[#10002b] text-[#f7ebff] border border-[#c3b1ff] rounded-lg resize-none text-sm"
            placeholder={`{\n  "name": "Walter",\n  "age": 20,\n  "car": null\n}`}
          ></textarea>

          {responseData.statusCode !== 0 && (
            <div className="mt-4 text-sm">
              <p>
                <span className="text-[#00c8a0] font-semibold">Response Status Code:</span> {responseData.statusCode} &nbsp;&nbsp;
                <span className="text-[#00c8a0] font-semibold">Status Text:</span> {responseData.statusText}
              </p>
            </div>
          )}

          <div className="mt-2 p-3 h-40 overflow-auto border border-[#c3b1ff] rounded-lg bg-[#10002b] text-sm whitespace-pre-wrap">
            <pre>{responseText}</pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiTool;
