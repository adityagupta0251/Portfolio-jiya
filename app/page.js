"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Star, Code, Smartphone, Tablet, Monitor } from "lucide-react";
import Head from "next/head";
import { Press_Start_2P, Fira_Code } from "next/font/google";
import html2canvas from "html2canvas";
import Image from "next/image";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "700"] });

const Home = () => {
  const texts = [
    "Be Ready to Explore.....",
    "The Future of Development",
    "Innovative Solutions",
    "Innovative Projects",
    "Through Technology",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("desktop");
  const [isCapturing, setIsCapturing] = useState(false);

  const pageRef = useRef(null);
  const devicePreviewRef = useRef(null);

  const deviceDimensions = {
    mobile: 375,
    tablet: 768,
    desktop: 1280,
  };

  // Typing effect
  useEffect(() => {
    if (typingText.length < texts[currentTextIndex].length) {
      const timer = setTimeout(() => {
        setTypingText(texts[currentTextIndex].slice(0, typingText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const pauseTimer = setTimeout(() => {
        setCurrentTextIndex((prev) => (prev < texts.length - 1 ? prev + 1 : 0));
        setTypingText("");
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }
  }, [typingText, currentTextIndex]);

  // Cursor blink
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  const handleStarClick = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => Math.max(0, newLiked ? prev + 1 : prev - 1));

    setIsCapturing(true);
    try {
      const canvas = await html2canvas(pageRef.current, {
        scale: 2,
        useCORS: true,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "jayanti-shaw-screenshot.png";
      link.click();
    } catch (error) {
      console.error("Screenshot failed:", error);
      alert("Screenshot failed. Try again.");
    } finally {
      setIsCapturing(false);
    }

    try {
      window.external.AddFavorite(window.location.href, document.title);
    } catch {
      alert(
        `Press ${navigator.platform.includes("Mac") ? "Cmd+D" : "Ctrl+D"
        } to bookmark this page.`
      );
    }
  };

  const handleCameraClick = () => setShowDeviceModal(true);
  const closeModal = () => setShowDeviceModal(false);
  const selectDevice = (device) => setSelectedDevice(device);

  const takeScreenshot = async () => {
    if (devicePreviewRef.current) {
      setIsCapturing(true);
      try {
        const canvas = await html2canvas(devicePreviewRef.current, {
          scale: 2,
          useCORS: true,
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `jayanti-shaw-${selectedDevice}-screenshot.png`;
        link.click();
      } catch (error) {
        console.error("Screenshot failed:", error);
        alert("Screenshot failed. Try again.");
      } finally {
        setIsCapturing(false);
      }
    }
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-sky-100 via-pink-100 to-pink-50 flex items-center justify-center p-6"
    >
      <Head>
        <title>Jayanti Shaw - Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-pink-300/30 rounded-2xl blur-xl group-hover:opacity-75 transition"></div>
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl transform transition group-hover:scale-105">

              <div className="relative">
                <img
                  src="https://avatars.githubusercontent.com/u/208905135?v=4"
                  alt="Jayanti Shaw"
                  style={{ width: '400px' }}
                />

              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button onClick={handleCameraClick}>
                  <Camera
                    size={44}
                    className="text-white bg-purple-600/50 rounded-full p-2 hover:bg-purple-600 transition"
                  />
                </button>
                <button onClick={handleStarClick}>
                  <Star
                    size={44}
                    className="text-white bg-blue-600/50 rounded-full p-2 hover:bg-blue-600 transition"
                  />
                </button>
                {likeCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {likeCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 text-center lg:text-left">
            <h1
              className={`${pressStart2P.className} text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 animate-gradient py-4 px-4 mx-auto max-w-4xl tracking-wide leading-tight`}
            >
              I'm Jayanti Shaw
            </h1>

            <div className="flex justify-center lg:justify-start mb-6">
              <div className="flex items-center bg-gradient-to-r from-sky-200/50 to-pink-200/50 py-3 px-6 rounded-lg">
                <Code className="mr-2 text-sky-600" size={24} />
                <div
                  className={`${firaCode.className} text-lg md:text-xl text-sky-800`}
                >
                  {typingText}
                  {showCursor && (
                    <span className="ml-1 w-2 h-6 bg-sky-600 inline-block animate-pulse" />
                  )}
                </div>
              </div>
            </div>

            <p
              className={`${firaCode.className} text-lg md:text-xl text-sky-900 leading-relaxed mb-8`}
            >
              Explore the intersection of development and cutting-edge
              technology. We dive deep into innovative projects, making &
              serving the world with innovation & tech.
            </p>

            <div className="flex justify-center lg:justify-start">
              <button
                className={`${firaCode.className} rounded-full px-8 py-3 text-lg font-bold bg-gradient-to-r from-sky-600 to-pink-500 hover:from-sky-700 hover:to-pink-600 text-white transform transition hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2`}
              >
                <span>Get Started</span>
                <Code size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Device Modal */}
      {showDeviceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4 text-center shadow-xl">
            <h2 className="text-xl font-bold text-sky-800">Select Device</h2>
            <div className="flex justify-center space-x-4 text-sky-700">
              <Smartphone
                size={32}
                onClick={() => selectDevice("mobile")}
                className="cursor-pointer hover:text-sky-900"
              />
              <Tablet
                size={32}
                onClick={() => selectDevice("tablet")}
                className="cursor-pointer hover:text-sky-900"
              />
              <Monitor
                size={32}
                onClick={() => selectDevice("desktop")}
                className="cursor-pointer hover:text-sky-900"
              />
            </div>
            <button
              onClick={takeScreenshot}
              className="bg-sky-600 text-white rounded-full px-6 py-2 hover:bg-sky-700 transition"
            >
              Capture Screenshot
            </button>
            <button
              onClick={closeModal}
              className="text-sky-600 underline hover:text-sky-800 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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

export default Home;
