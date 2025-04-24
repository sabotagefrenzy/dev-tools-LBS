import React, { useState, useEffect } from 'react';
import NavigationBar from '../NavigationBar';
import { FiCopy, FiDownload, FiFileText, FiHeart } from 'react-icons/fi';
import jsPDF from 'jspdf';

const TOOL_KEY = 'favoriteTools';

const Base64 = () => {
  const [reqFunc, setReqFunc] = useState('encode');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);

  // Load favorite state from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];
    setIsFavourite(storedFavorites.includes('Base64 Encoder And Decoder'));
  }, []);

  // Toggle favorite and store it
  const toggleFavourite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];

    if (isFavourite) {
      storedFavorites = storedFavorites.filter((tool) => tool !== 'Base64 Encoder And Decoder');
    } else {
      storedFavorites.push('Base64 Encoder And Decoder');
    }

    localStorage.setItem(TOOL_KEY, JSON.stringify(storedFavorites));
    setIsFavourite(!isFavourite);
  };

  // Handle conversion
  const handleConversion = (value) => {
    setInputText(value);
    try {
      if (reqFunc === 'encode') {
        setOutputText(btoa(value));
      } else {
        setOutputText(atob(value));
      }
    } catch (error) {
      setOutputText('Error: Invalid input for decoding.');
    }
  };

  // Copy output to clipboard
  const copyToClipboard = () => {
    if (outputText.length > 0) {
      navigator.clipboard.writeText(outputText);
    }
  };

  // Download output as .txt
  const downloadAsText = () => {
    if (outputText.length > 0) {
      const blob = new Blob([outputText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Download output as PDF
  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.text(outputText, 20, 20);
    doc.save('output.pdf');
  };

  return (
    <div className="bg-[#10002b] min-h-screen text-[#f7ebff]">
      <NavigationBar />

      {/* Title Section */}
      <section className="pt-30 pb-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-6 text-[#c3b1ff]">Base64 Encoder And Decoder</h1>
          <button onClick={toggleFavourite} className="text-2xl hover:scale-110 transition-transform">
            {isFavourite ? (
              <FiHeart fill="#ff4d4d" stroke="#ff4d4d" />
            ) : (
              <FiHeart stroke="#ffffff" fill="none" />
            )}
          </button>
        </div>
        <p className="text-sm md:text-base leading-relaxed">
          Easily convert data with our intuitive Base64 Encoder and Decoder. Whether you're securing information through encoding or revealing original content from a Base64 string, this tool makes the task quick and simple. Designed for developers, cybersecurity experts, and data handlers, this tool ensures smooth and reliable data conversion.
        </p>
      </section>

      {/* Tool Interface */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto p-6 bg-[#3a2f59] rounded-xl shadow-lg">

          <label className="block text-sm font-medium mb-2 text-[#c3b1ff]">Choose Function</label>
          <select
            value={reqFunc}
            onChange={(e) => setReqFunc(e.target.value)}
            className="bg-[#10002b] text-[#f7ebff] border border-[#c3b1ff] rounded-lg p-2 w-full mb-4"
          >
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </select>

          <label className="block text-sm font-medium mb-2 text-[#c3b1ff]">Input Text</label>
          <textarea
            rows="7"
            value={inputText}
            onChange={(e) => handleConversion(e.target.value)}
            className="w-full p-2 bg-[#10002b] text-[#f7ebff] border border-[#c3b1ff] rounded-lg resize-none text-sm mb-4"
            placeholder="Enter text here..."
          ></textarea>

          <label className="block text-sm font-medium mb-2 text-[#c3b1ff]">Result</label>
          <textarea
            rows="7"
            value={outputText}
            readOnly
            className="w-full p-2 bg-[#10002b] text-[#f7ebff] border border-[#c3b1ff] rounded-lg resize-none text-sm mb-4"
          ></textarea>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <button
              onClick={copyToClipboard}
              className="flex justify-center items-center gap-2 bg-[#00c8a0] hover:bg-[#00b393] text-[#10002b] font-semibold px-4 py-2 rounded-lg transition-all"
            >
              <FiCopy /> Copy
            </button>

            <button
              onClick={downloadAsText}
              className="flex justify-center items-center gap-2 bg-[#00c8a0] hover:bg-[#00b393] text-[#10002b] font-semibold px-4 py-2 rounded-lg transition-all"
            >
              <FiFileText /> Download as .txt
            </button>

            <button
              onClick={downloadAsPDF}
              className="flex justify-center items-center gap-2 bg-[#00c8a0] hover:bg-[#00b393] text-[#10002b] font-semibold px-4 py-2 rounded-lg transition-all"
            >
              <FiDownload /> Download as PDF
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Base64;
