import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const text = "Ai ChatBot..."; // Your text here
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 100); // typing speed in ms
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-6 lg:px-20 bg-black overflow-hidden">
      {/* Decorative blobs */}
      {/* <div className="absolute top-10 left-10 w-72 h-72 bg-[#2563eb] rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#38bdf8] rounded-full opacity-20 blur-3xl"></div> */}

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row items-center gap-14 z-10">
        {/* Image Section */}
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <img
            className="max-h-[420px] drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            src="../../public/imgs/new-logo - Copy.webp"
            alt="AI Bot"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-amber-50 text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
            {displayedText}
          </h1>
          <h2 className="text-2xl md:text-3xl mt-4 text-gray-500 font-medium">
            Your Personal Assistant!
          </h2>
          <p className="mt-5 text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Experience the future of interaction — smart, responsive, and always
            ready to assist you with your needs.
          </p>

          {/* Button */}
          <Link
            to="/chat"
            className="inline-block mt-7 px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-lg border hover:bg-amber-50 hover:text-black transition-all duration-300 active:scale-95"
          >
            👋 Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
