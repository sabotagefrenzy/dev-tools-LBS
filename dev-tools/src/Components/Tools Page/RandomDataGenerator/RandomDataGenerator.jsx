import React, { useState , useEffect} from "react";
import { js2csv, js2tsv } from "./dataConverter";
import { valueReturn, fieldTypes, dataFormats } from "./store";
import download from "downloadjs";
import FieldComponent from "./FieldComponent";
import NavigationBar from "../../NavigationBar";
import { FiHeart, FiHeart as FiHeartFilled } from "react-icons/fi";

const RandomDataGenerator = () => {
  const [fields, setFields] = useState([{ id: 0, name: "Field 0", type: "Word" }]);
  const [idCounter, setIdCounter] = useState(1);
  const [dataFormat, setDataFormat] = useState("JSON");
  const [noOfRows, setNoOfRows] = useState(10);


  const TOOL_KEY = 'favoriteTools';
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];
      setIsFavourite(storedFavorites.includes('Random Data Generator'));
    }, []);

  const toggleFavourite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];

    if (isFavourite) {
      storedFavorites = storedFavorites.filter((tool) => tool !== 'Random Data Generator');
    } else {
      storedFavorites.push('Random Data Generator');
    }

    localStorage.setItem(TOOL_KEY, JSON.stringify(storedFavorites));
    setIsFavourite(!isFavourite);
  };

  const addField = () => {
    setFields((prev) => [
      ...prev,
      { id: idCounter, name: `Field ${idCounter}`, type: "Word" },
    ]);
    setIdCounter(idCounter + 1);
  };

  const removeField = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const updateField = (id, key, value) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const generateData = () => {
    const fieldNames = fields.map((f) => f.name);
    const fieldTypesList = fields.map((f) => f.type);

    const testData = [];
    for (let i = 0; i < noOfRows; i++) {
      const newData = {};
      fieldNames.forEach((name, index) => {
        newData[name] = valueReturn(fieldTypesList[index]);
      });
      testData.push(newData);
    }

    initiateDownload(testData);
  };

  const initiateDownload = (testData) => {
    switch (dataFormat) {
      case "JSON":
        download(JSON.stringify(testData, null, 2), "testData.json", "text/plain");
        break;
      case "CSV":
        download(js2csv(testData), "testData.csv", "text/plain");
        break;
      case "TSV":
        download(js2tsv(testData), "testData.tsv", "text/plain");
        break;
      case "JavaScript":
        download(`const data = ${JSON.stringify(testData, null, 2)};`, "testData.js", "text/plain");
        break;
      default:
        alert("Unknown format selected.");
    }
  };

  return (
    <div className="bg-[#10002b] min-h-screen text-[#f7ebff]">
        <NavigationBar/>
        {/* Title Section */}
        <section className="pt-40 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-6 text-[#c3b1ff]">
                    Random Data Generator
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
            The Random Data Generator is a handy tool that allows you to quickly generate fake or sample data for testing and development purposes. Whether you need random names, emails, phone numbers, addresses, or other types of data, this tool can instantly create realistic-looking information to help you simulate real-world scenarios. It's perfect for developers, testers, and designers who want to populate their applications, websites, or databases without using actual user data. With customizable options, the Random Data Generator saves time and ensures your projects are ready for presentation, testing, or development.
            </p>
        </section>

        {/* Tool */}
        <section className="pt-10">
        <div className="max-w-screen-lg mx-auto border-2 border-[#3a2f59] rounded-lg p-6">
            <div className="grid grid-cols-3 text-[#f7ebff] font-semibold mb-2">
            <p>Field</p>
            <p>Type</p>
            <p>Delete</p>
            </div>
            <hr className="mb-4 border-[#3a2f59]" />

            {fields.map((field) => (
            <FieldComponent
                key={field.id}
                id={field.id}
                name={field.name}
                type={field.type}
                onChange={updateField}
                onRemove={removeField}
            />
            ))}

            <div className="flex justify-center mt-4 mb-4">
            <button
                className="flex items-center gap-2 border-2 border-[#3a2f59] text-[#f7ebff] px-4 py-2 rounded-lg hover:bg-[#00b393]"
                onClick={addField}
            >
                <svg className="fill-[#f7ebff]" xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M10.85 19.15v-6h-6v-2.3h6v-6h2.3v6h6v2.3h-6v6Z" />
                </svg>
                <span>Add Field</span>
            </button>
            </div>

            <hr className="my-4 border-[#3a2f59]" />

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div>
                <label className="block mb-1 text-[#c3b1ff]">Data Format:</label>
                <select
                className="w-full p-2 rounded-lg border border-[#3a2f59] text-[#f7ebff] bg-[#3a2f59] focus:outline-none"
                value={dataFormat}
                onChange={(e) => setDataFormat(e.target.value)}
                >
                {dataFormats.map((format) => (
                    <option key={format} value={format}>
                    {format}
                    </option>
                ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 text-[#c3b1ff]">No. of Rows:</label>
                <input
                type="number"
                className="w-full p-2 rounded-lg border border-[#3a2f59] text-[#f7ebff] bg-[#3a2f59] focus:outline-none"
                min="1"
                max="10000"
                value={noOfRows}
                onChange={(e) => setNoOfRows(Number(e.target.value))}
                />
            </div>
            </div>

            <button
            onClick={generateData}
            className="w-full p-3 border-2 border-[#3a2f59] rounded-lg text-[#f7ebff] font-semibold hover:bg-[#00b393] focus:outline-none"
            >
            GENERATE DATA
            </button>
        </div>
        </section>
    </div>
  );
};

export default RandomDataGenerator;
