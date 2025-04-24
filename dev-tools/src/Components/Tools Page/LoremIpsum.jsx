

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import NavigationBar from "../NavigationBar";
import { FiHeart, FiHeart as FiHeartFilled } from "react-icons/fi";

const LoremIpsum = () => {
  const [len, setLen] = useState(11);
  const [output, setOutput] = useState("");
  const TOOL_KEY = 'favoriteTools';
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];

    if (isFavourite) {
      storedFavorites = storedFavorites.filter((tool) => tool !== 'Lorem Ipsum Generator');
    } else {
      storedFavorites.push('Lorem Ipsum Generator');
    }

    localStorage.setItem(TOOL_KEY, JSON.stringify(storedFavorites));
    setIsFavourite(!isFavourite);
  };

  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ";

  useEffect(() => {
    generateOutput();
    const storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];
      setIsFavourite(storedFavorites.includes('Lorem Ipsum Generator'));
  }, [len]);


  const generateOutput = () => {
    if (len <= 0) {
      setOutput("Invalid input. Please provide a positive number of characters.");
      return;
    }

    let str = "";
    while (str.length < len) {
      str += loremIpsum;
    }
    setOutput(str.slice(0, len));
  };

  const copyText = () => {
    if (output.length > 0) {
      navigator.clipboard.writeText(output);
    }
  };

  const downloadText = () => {
    if (output.length > 0) {
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.txt";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const downloadPDF = () => {
    if (output.length > 0) {
      const doc = new jsPDF();
      doc.text(output, 20, 20);
      doc.save("output.pdf");
    }
  };

  return (
    <div className="bg-[#10002b] min-h-screen text-[#f7ebff]">
        <NavigationBar/>
        {/* Title Section */}
        <section className="pt-40 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-6 text-[#c3b1ff]">
                    Lorem Ipsum Generator
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
            The Lorem Ipsum Generator is a simple and useful tool that lets you create placeholder text in seconds. All you need to do is enter the number of characters you want, and the tool will instantly generate Lorem Ipsum text to match your needs. This is especially helpful for designers, developers, and content creators who need sample text to test out layouts, designs, or website templates. Using placeholder text ensures that your project looks complete and professional, even before the actual content is ready. It helps maintain proper spacing, alignment, and overall visual balance, making your design work easier and more efficient. With this tool, you can focus more on the look and feel of your project without having to worry about writing or finding temporary content.
            </p>
        </section>

        {/* Tool */}
        <section className=" bg-[##10002b] max-w-6xl mx-auto pt-10 pb-2">
        <div className="mx-auto max-w-screen-xl lg:px-12">
            <div className="bg-[#3a2f59] p-6 rounded-2xl shadow-lg text-[#f7ebff]">
            <div className="w-full mb-6">
                <label className="block mb-2 text-sm font-medium text-[#c3b1ff]">
                Number of Characters
                </label>
                <input
                type="number"
                className="bg-[#10002b] border border-[#c3b1ff] text-[#f7ebff] text-sm rounded-lg focus:ring-[#00c8a0] focus:border-[#00c8a0] block w-full p-2.5 placeholder-[#c3b1ff]"
                value={len}
                onChange={(e) => setLen(Number(e.target.value))}
                required
                />
            </div>

            <div className="mt-4 w-full">
                <textarea
                placeholder="Result"
                rows="8"
                className=" resize-none block p-3 w-full text-sm text-[#f7ebff] bg-[#10002b] rounded-lg border border-[#c3b1ff] focus:ring-[#00c8a0] focus:border-[#00c8a0] placeholder-[#c3b1ff]"
                value={output}
                readOnly
                />
            </div>

            <div className="mt-8 grid gap-4 w-full lg:grid-cols-3">
                <button
                onClick={copyText}
                className="w-full bg-[#00c8a0] hover:bg-[#00b393] text-[#10002b] font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                Copy
                </button>
                <button
                onClick={downloadText}
                className="w-full bg-[#00c8a0] hover:bg-[#00b393] text-[#10002b] font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                Download as txt
                </button>
                <button
                onClick={downloadPDF}
                className="w-full bg-[#00c8a0] hover:bg-[#00b393] text-[#10002b] font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                Download as pdf
                </button>
            </div>
            </div>
        </div>
        </section>
    </div>
  );
};

export default LoremIpsum;
