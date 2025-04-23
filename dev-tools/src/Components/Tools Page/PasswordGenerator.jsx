import { useState, useEffect } from "react";
import { FiHeart, FiHeart as FiHeartFilled } from "react-icons/fi";
import NavigationBar from "../NavigationBar";

const PasswordGenerator = () => {
  const TOOL_NAME = "Password Generator";

  const charsets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*?",
  };

  const [length, setLength] = useState(12);
  const [characters, setCharacters] = useState(["uppercase", "lowercase", "numbers", "symbols"]);
  const [password, setPassword] = useState("");

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteTools")) || [];
    setIsFavourite(storedFavorites.includes(TOOL_NAME));
  }, []);

  const toggleFavourite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteTools")) || [];
    let updatedFavorites;

    if (storedFavorites.includes(TOOL_NAME)) {
      updatedFavorites = storedFavorites.filter((tool) => tool !== TOOL_NAME);
    } else {
      updatedFavorites = [...storedFavorites, TOOL_NAME];
    }

    localStorage.setItem("favoriteTools", JSON.stringify(updatedFavorites));
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    const generatePassword = () => {
      let charset = Object.keys(charsets)
        .filter((character) => characters.includes(character))
        .map((character) => charsets[character])
        .join("");

      let generatedPassword = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
      }

      setPassword(generatedPassword);
    };

    generatePassword();
  }, [length, characters]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCharacters((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((char) => char !== value);
      }
    });
  };

  return (
    <div>
      <NavigationBar />
      <div className="bg-[#10002b] pt-20 px-25">
        <div className="max-w-screen-xl mx-auto py-16">
          {/* Title and Description */}
          <div className="text-[#f7ebff] mb-12">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-extrabold text-[#c3b1ff] mb-6">
                {TOOL_NAME}
              </h1>
              <button onClick={toggleFavourite} className="text-2xl hover:scale-110  transition-transform">
              {isFavourite ? (
                <FiHeartFilled fill="#ff4d4d" stroke="#ff4d4d" />
              ) : (
                <FiHeart stroke="#ffffff" fill="none" />
              )}
              </button>
            </div>
            <p className="text-lg mt-4">
              The Password Generator is a dependable and secure tool designed to help developers effortlessly create strong and unique passwords for their applications. It offers customizable features, including the ability to adjust password length, select character types (uppercase, lowercase, numbers, symbols), and exclude ambiguous characters. This ensures the generation of robust passwords that adhere to top-tier security standards. Streamline the password creation process and enhance the security of your applications with this user-friendly tool.
            </p>
          </div>

          {/* Password Generator Card */}
          <div className="card gap-12 p-10 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg bg-[#3a2f59]">
            <div className="p-8 text-[#f7ebff]">
              <label className="block text-[#f7ebff]">Password Length</label>
              <div className="flex items-center">
                <span className="text-[#f7ebff] mr-3">1</span>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="flex-1"
                />
                <span className="text-[#f7ebff] ml-3">50</span>
              </div>

              <label className="mt-3 block text-[#f7ebff]">Characters</label>
              <div className="flex gap-3 flex-wrap">
                {Object.keys(charsets).map((key) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={key}
                      value={key}
                      checked={characters.includes(key)}
                      onChange={handleCheckboxChange}
                      disabled={characters.length <= 1 && characters.includes(key)}
                      className="accent-[#00c8a0]"
                    />
                    <label htmlFor={key} className="ml-2 text-[#f7ebff] capitalize">{key}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Password Display Section */}
            <div
              className={`p-8 h-full flex rounded-lg relative justify-center items-center ${
                length > 10 ? "bg-[#00c8a0]" : length > 8 ? "bg-[#00b393]" : "bg-red-300"
              }`}
            >
              <button
                onClick={() => navigator.clipboard.writeText(password)}
                className="absolute top-2 right-2 p-2 bg-white text-gray-800 rounded-md hover:bg-[#00b393]"
              >
                Copy
              </button>
              <span className="text-2xl font-extrabold break-all text-[#f7ebff]">{password}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
