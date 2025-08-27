import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TYPING_TEXT = "Ai ChatBot...";
const TYPING_SPEED = 100;

const Home = () => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (displayedText.length >= TYPING_TEXT.length) return;
    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length < TYPING_TEXT.length) {
          return prev + TYPING_TEXT.charAt(prev.length);
        } else {
          clearInterval(intervalRef.current);
          return prev;
        }
      });
    }, TYPING_SPEED);
    return () => clearInterval(intervalRef.current);
  }, [displayedText]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-6 lg:px-20 bg-black overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-14 z-10">
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <img
            className="max-h-[420px] drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            src="/imgs/new-logo - Copy.webp"
            alt="AI Bot"
          />
        </div>
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
