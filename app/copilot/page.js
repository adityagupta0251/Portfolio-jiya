"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Driver from "driver.js";
import "driver.js/dist/driver.css";
import { 
  Send, 
  Paperclip, 
  Mic, 
  X, 
  HelpCircle, 
  User, 
  Bot, 
  FileText, 
  ExternalLink, 
  ChevronDown, 
  Moon, 
  Sun, 
  Clock 
} from "lucide-react";

const copilot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi there! I'm Jayanti's portfolio assistant. I can help navigate the site, answer questions about projects, skills, or provide any information you need!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const router = useRouter();

  const suggestions = [
    "Show me your projects",
    "Tell me about yourself",
    "Take a website tour",
    "View your resume",
    "How can I contact you?"
  ];

  const emojis = ["😊", "👍", "🔥", "❤️", "🎉", "🤔", "👏", "🚀"];

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Apply dark mode
  useEffect(() => {
    if (chatContainerRef.current) {
      if (isDarkMode) {
        chatContainerRef.current.classList.add("dark-mode");
      } else {
        chatContainerRef.current.classList.remove("dark-mode");
      }
    }
  }, [isDarkMode]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { 
      role: "user", 
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);
    setShowSuggestions(false);

    // Process the user's message
    setTimeout(() => {
      processUserMessage(userMessage.content);
      setIsThinking(false);
    }, Math.random() * 1000 + 500); // Random delay between 500-1500ms for realistic effect
  };

  // Process user message and generate response
  const processUserMessage = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    let response = "";
    
    // Generate response based on user input
    if (lowerCaseMessage.includes("projects") || lowerCaseMessage.includes("portfolio")) {
      response = "Here are my projects! Take a look at what I've been working on.";
      navigateToProjects();
    } else if (lowerCaseMessage.includes("blog")) {
      response = "Here's my blog with my latest thoughts and articles!";
      navigateToBlog();
    } else if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("email")) {
      response = "You can reach me via email at jayanti@example.com or through the contact form. Would you like me to navigate to the contact page?";
      navigateToContact();
    } else if (lowerCaseMessage.includes("about") || lowerCaseMessage.includes("yourself")) {
      response = "I'm Jayanti, a fullstack developer with 5+ years of experience specializing in React, Node.js, and cloud technologies. I love building innovative solutions and sharing knowledge through my blog!";
      navigateToAbout();
    } else if (lowerCaseMessage.includes("home")) {
      response = "Taking you to the home page!";
      navigateToHome();
    } else if (lowerCaseMessage.includes("resume") || lowerCaseMessage.includes("cv")) {
      response = "Opening my resume in a new tab. It highlights my work experience, education, and technical skills.";
      handleResume();
    } else if (lowerCaseMessage.includes("tour") || lowerCaseMessage.includes("guide")) {
      response = "Let me give you a tour of my portfolio! I'll highlight the key sections of the website.";
      startTour();
    } else if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hey")) {
      response = "Hello there! 👋 How can I assist you today? Feel free to ask about my projects, experience, or navigate through the portfolio.";
    } else if (lowerCaseMessage.includes("skills") || lowerCaseMessage.includes("technologies")) {
      response = "My core skills include:\n• Frontend: React, Next.js, TypeScript\n• Backend: Node.js, Express, Python\n• Database: MongoDB, PostgreSQL\n• DevOps: AWS, Docker, GitHub Actions\n• Design: Figma, Tailwind CSS";
    } else if (lowerCaseMessage.includes("experience") || lowerCaseMessage.includes("work history")) {
      response = "I have 5+ years of professional experience including:\n• Senior Developer at TechCorp (2022-Present)\n• Frontend Engineer at StartupX (2020-2022)\n• Web Developer at DigitalSolutions (2018-2020)\nWould you like to see my detailed resume?";
    } else if (lowerCaseMessage.includes("dark mode") || lowerCaseMessage.includes("light mode") || lowerCaseMessage.includes("theme")) {
      toggleDarkMode();
      response = `Theme switched to ${isDarkMode ? "light" : "dark"} mode! How does it look?`;
    } else {
      // AI-like response for general questions
      const generalResponses = [
        "That's an interesting question! Based on my portfolio information, ",
        "Great question! From what I understand, ",
        "I'd be happy to help with that. Looking at my experience, ",
        "Thanks for asking! According to my portfolio, "
      ];
      
      // Simulate an AI-like response by mixing relevant keywords from the question
      const keywords = message.split(" ").filter(word => word.length > 4);
      let relevantTopic = "my background involves extensive work with modern web technologies";
      
      if (keywords.length > 0) {
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        if (randomKeyword) {
          relevantTopic = `I've worked on several projects involving ${randomKeyword} and related technologies`;
        }
      }
      
      response = generalResponses[Math.floor(Math.random() * generalResponses.length)] + 
                relevantTopic + ". Would you like to know more about my projects or experience?";
    }

    // Add assistant response
    const assistantMessage = {
      role: "assistant",
      content: response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, assistantMessage]);
  };

  // Navigation functions
  const navigateToHome = () => {
    router.push("/");
    highlightElement("hero-section");
  };

  const navigateToProjects = () => {
    router.push("/projects");
    highlightElement("projects-section");
  };

  const navigateToBlog = () => {
    router.push("/blog");
    highlightElement("blog-section");
  };

  const navigateToContact = () => {
    router.push("/contactUs");
    highlightElement("contact-section");
  };

  const navigateToAbout = () => {
    router.push("/about");
    highlightElement("about-section");
  };

  const handleResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSubmit({ preventDefault: () => {} });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileSize = (file.size / 1024).toFixed(1) + " KB";
      
      // Add user message with file info
      const userMessage = { 
        role: "user", 
        content: `[Uploaded file: ${fileName}]`,
        attachment: { name: fileName, size: fileSize, type: file.type },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, userMessage]);
      
      // Simulate processing response
      setIsThinking(true);
      setTimeout(() => {
        const assistantMessage = {
          role: "assistant",
          content: `I received your file "${fileName}" (${fileSize}). While I can't process its contents directly, I can help answer questions about it or discuss related topics!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsThinking(false);
      }, 1500);
    }
  };

  // Handle voice recording
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate voice recognition result
      setTimeout(() => {
        const recognizedText = "Show me your recent projects";
        setInputValue(recognizedText);
      }, 1000);
    } else {
      setIsRecording(true);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Add emoji to input
  const addEmoji = (emoji) => {
    setInputValue(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Highlight an element on the page
  const highlightElement = (elementId) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        element.classList.add("highlight-animation");
        setTimeout(() => {
          element.classList.remove("highlight-animation");
        }, 2000);
      }
    }, 500);
  };

  // Start a guided tour of the site using Driver.js
  const startTour = () => {
    setTimeout(() => {
      const driver = new Driver({
        showProgress: true,
        animate: true,
        showButtons: ["next", "previous", "close"],
        steps: [
          {
            element: "#hero-section",
            popover: {
              title: "Welcome to my Portfolio!",
              description: "This is where you can learn about who I am and what I do.",
              position: "bottom",
            }
          },
          {
            element: "#about-section",
            popover: {
              title: "About Me",
              description: "Learn more about my background, skills, and experience.",
              position: "bottom",
            }
          },
          {
            element: "#projects-section",
            popover: {
              title: "My Projects",
              description: "Check out some of the work I've done.",
              position: "top",
            }
          },
          {
            element: "#blog-section",
            popover: {
              title: "My Blog",
              description: "Read my thoughts and articles on various topics.",
              position: "top",
            }
          },
          {
            element: "#contact-section",
            popover: {
              title: "Contact Me",
              description: "Get in touch if you'd like to work together!",
              position: "top",
            }
          },
          {
            element: "#chatbot-container",
            popover: {
              title: "Portfolio Assistant",
              description: "Chat with me here or ask for help navigating the site!",
              position: "left",
            }
          }
        ]
      });
      
      driver.drive();
    }, 500);
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat history cleared! How else can I help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setShowSuggestions(true);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Container with margin top and bottom */}
      <div className="flex-1 overflow-hidden flex flex-col mx-4 my-5">
        <div
          id="chatbot-container"
          ref={chatContainerRef}
          className={`flex-1 flex rounded-xl overflow-hidden shadow-2xl ${isDarkMode ? 'dark-theme' : ''}`}
          style={{zIndex: 1000}}
        >
          {/* Sidebar */}
          <div className="w-1/4 bg-gradient-to-b from-blue-600 to-purple-600 text-white p-4 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Bot className="mr-2" size={24} />
                Portfolio Assistant
              </h2>
              <p className="mt-1 text-sm opacity-80">Ask me anything about Jayanti's portfolio!</p>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-3">Quick Navigation</h3>
              <div className="space-y-2">
                <button 
                  onClick={navigateToHome}
                  className="w-full text-left py-1.5 px-3 rounded-md hover:bg-white/20 transition flex items-center text-sm"
                >
                  <span className="mr-2">🏠</span> Home
                </button>
                <button 
                  onClick={navigateToAbout}
                  className="w-full text-left py-1.5 px-3 rounded-md hover:bg-white/20 transition flex items-center text-sm"
                >
                  <span className="mr-2">👩‍💻</span> About Me
                </button>
                <button 
                  onClick={navigateToProjects}
                  className="w-full text-left py-1.5 px-3 rounded-md hover:bg-white/20 transition flex items-center text-sm"
                >
                  <span className="mr-2">🚀</span> Projects
                </button>
                <button 
                  onClick={navigateToBlog}
                  className="w-full text-left py-1.5 px-3 rounded-md hover:bg-white/20 transition flex items-center text-sm"
                >
                  <span className="mr-2">✍️</span> Blog
                </button>
                <button 
                  onClick={navigateToContact}
                  className="w-full text-left py-1.5 px-3 rounded-md hover:bg-white/20 transition flex items-center text-sm"
                >
                  <span className="mr-2">📞</span> Contact
                </button>
                <button 
                  onClick={handleResume}
                  className="w-full text-left py-1.5 px-3 rounded-md hover:bg-white/20 transition flex items-center text-sm"
                >
                  <span className="mr-2">📄</span> Resume
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <button 
                onClick={startTour} 
                className="w-full text-left py-1.5 px-3 rounded-md hover:bg-white/20 transition flex items-center text-sm"
              >
                <HelpCircle size={16} className="mr-2" /> Take Tour
              </button>
              <button 
                onClick={toggleDarkMode} 
                className="w-full text-left py-1.5 px-3 rounded-md hover:bg-white/20 transition flex items-center text-sm"
              >
                {isDarkMode ? (
                  <>
                    <Sun size={16} className="mr-2" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={16} className="mr-2" /> Dark Mode
                  </>
                )}
              </button>
              <div className="mt-3 text-xs opacity-70 text-center">
                &copy; 2025 Jayanti's Portfolio
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className={`w-3/4 flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            {/* Header */}
            <div className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
              <h3 className="font-semibold text-lg">Chat with Jayanti's Assistant</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={clearChat}
                  className={`px-2 py-1 rounded-md text-sm ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Clear Chat
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
                      <Bot size={16} />
                    </div>
                  )}
                  
                  <div className={`max-w-3/4 overflow-hidden`}>
                    <div
                      className={`p-3 rounded-xl ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : isDarkMode 
                            ? "bg-gray-700 text-white" 
                            : "bg-white text-black shadow-md"
                      }`}
                    >
                      {message.content}
                      
                      {message.attachment && (
                        <div className="mt-1 p-1.5 bg-white/20 dark:bg-black/20 rounded-md flex items-center text-xs">
                          <FileText size={14} className="mr-1" />
                          <div>
                            <div className="font-medium">{message.attachment.name}</div>
                            <div className="text-xs opacity-70">{message.attachment.size}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 flex items-center`}>
                      <Clock size={12} className="mr-1" /> {message.timestamp}
                    </div>
                  </div>
                  
                  {message.role === "user" && (
                    <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center ml-2 flex-shrink-0`}>
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}
              
              {isThinking && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className={`max-w-3/4 p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-md'}`}>
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quick suggestions */}
              {showSuggestions && !isThinking && messages.length < 3 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-white hover:bg-gray-100'
                      } transition-colors`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className={`p-3 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'}`}>
              {isRecording && (
                <div className={`mb-2 p-2 ${
                  isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
                } rounded-md text-xs flex items-center justify-between`}>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
                    Recording audio...
                  </div>
                  <button 
                    onClick={toggleRecording} 
                    className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {showEmojiPicker && (
                <div className={`mb-2 p-2 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                } rounded-md border flex flex-wrap gap-2`}>
                  {emojis.map((emoji, idx) => (
                    <button
                      key={idx}
                      onClick={() => addEmoji(emoji)}
                      className={`text-lg ${
                        isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                      } w-8 h-8 flex items-center justify-center rounded-full transition-colors`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="relative">
                <div className={`flex rounded-lg ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
                } overflow-hidden border`}>
                  <div className="flex items-center pl-2">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors p-1`}
                    >
                      😊
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors p-1`}
                    >
                      <Paperclip size={18} />
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={isRecording ? "Listening..." : "Type a message..."}
                    className={`flex-1 py-3 px-3 bg-transparent focus:outline-none ${isDarkMode ? 'text-white' : 'text-black'}`}
                    disabled={isRecording}
                  />
                  
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={`p-2 ${
                        isRecording 
                          ? 'text-red-500 dark:text-red-400' 
                          : isDarkMode 
                            ? 'text-gray-400 hover:text-gray-300' 
                            : 'text-gray-500 hover:text-gray-700'
                      } transition-colors`}
                    >
                      <Mic size={18} />
                    </button>
                    
                    <button
                      type="submit"
                      className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50 transition-all hover:from-blue-600 hover:to-purple-700"
                      disabled={!inputValue.trim() || isThinking || isRecording}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default copilot;