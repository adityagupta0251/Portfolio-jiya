"use client";

import { useState, useEffect } from "react";
import { Camera, Star, Code } from "lucide-react";
import Image from "next/image";
import { Press_Start_2P, Fira_Code } from "next/font/google";
import React from "react";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const home = () => {
  const texts = [
    "Be Ready to Explore.....",
    "The Future of Development",
    "Innovative Solutions",
    "Innovative Projects",
    "Through Technology",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Typing effect
    if (isTyping && typingText.length < texts[currentTextIndex].length) {
      const timer = setTimeout(() => {
        setTypingText(texts[currentTextIndex].slice(0, typingText.length + 1));
      }, 100); // Typing speed (milliseconds between characters)
      return () => clearTimeout(timer);
    } else if (typingText.length === texts[currentTextIndex].length) {
      // Pause before switching to next text or restarting
      const pauseTimer = setTimeout(() => {
        if (currentTextIndex < texts.length - 1) {
          setCurrentTextIndex(prev => prev + 1);
        } else {
          setCurrentTextIndex(0);
        }
        setTypingText('');
        setIsTyping(true);
      }, 2000); // Pause duration before next text
      return () => clearTimeout(pauseTimer);
    }

    // Cursor blinking effect
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, [typingText, currentTextIndex, isTyping, texts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-pink-100 to-pink-50 flex items-center justify-center p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-pink-300/30 rounded-2xl blur-xl group-hover:opacity-75 transition duration-300 ease-in-out"></div>
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl transform transition duration-300 group-hover:scale-105">
              <div className="relative w-full aspect-[6/5]">
                <img src="https://avatars.githubusercontent.com/u/208905135?v=4" width={400} >

                </img>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Camera
                  className="text-white bg-purple-600/50 rounded-full p-2 hover:bg-purple-600 transition"
                  size={44}
                />
                <Star
                  className="text-white bg-blue-600/50 rounded-full p-2 hover:bg-blue-600 transition"
                  size={44}
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Heading */}
            <h1
              className={`
                ${pressStart2P.className} 
                text-4xl md:text-5xl lg:text-6xl 
                text-transparent bg-clip-text bg-gradient-to-r 
                from-sky-500 via-pink-500 to-purple-500 
                animate-gradient
                py-4 md:py-6 
                px-4 md:px-8 
                mx-auto 
                max-w-4xl 
                text-center 
                tracking-wide 
                leading-tight
              `}
            >
              I'm Jayanti Shaw
            </h1>

            {/* Typing Effect */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="flex items-center bg-gradient-to-r from-sky-200/50 to-pink-200/50 py-3 px-6 rounded-lg">
                <div className="flex items-center">
                  <Code className="mr-2 text-sky-600" size={24} />
                  <div
                    className={`${firaCode.className} text-lg md:text-xl text-sky-800`}
                  >
                    {typingText}
                    {showCursor && (
                      <span className="ml-1 w-2 h-6 bg-sky-600 inline-block animate-pulse"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p
              className={`${firaCode.className} text-lg md:text-xl text-sky-900 leading-relaxed mb-8`}
            >
              Explore the intersection of development and cutting-edge technology. We
              dive deep into innovative projects, Making & serving the world with innovation & tech , and
              the future of solutions.
            </p>

            {/* Call to Action */}
            <div className="flex justify-center lg:justify-start">
              <button
                className={`${firaCode.className} rounded-full px-8 py-3 text-lg font-bold 
                bg-gradient-to-r from-sky-600 to-pink-500 
                hover:from-sky-700 hover:to-pink-600 
                text-white 
                transform transition duration-300 hover:scale-105 
                shadow-lg hover:shadow-xl 
                flex items-center space-x-2`}
              >
                <span>Get Started</span>
                <Code size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-animation 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default home;