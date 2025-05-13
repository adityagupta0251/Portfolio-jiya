"use client";
import React, { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleNavbar = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md" : "bg-white"}`}>
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-10">
        <div className={`flex h-20 items-center justify-between rounded-full my-4 px-6 shadow-lg ${scrolled ? "bg-gradient-to-r from-blue-50 to-purple-50" : "bg-gradient-to-r from-blue-100/80 to-purple-100/80"}`}>
          <div className="flex-1 flex items-center gap-4">
            <a className="block p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" href="#">
              <span className="sr-only">Home</span>
              <div className="bg-white p-1 rounded-full">
                <img
                  src="https://avatars.githubusercontent.com/u/208905135?v=4"
                  width={36}
                  height={36}
                  className="rounded-full"
                  alt="User avatar"
                />
              </div>
            </a>
            <Link href="#" className="group">
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold text-2xl tracking-tight transition-all hover:from-pink-500 hover:to-sky-500">
                Jayanti
              </span>
            </Link>
          </div>
          
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              
              
              <li>
                <a className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text transition duration-300 hover:from-pink-500 hover:to-sky-500 relative group mr-5" href="/projects">
                  Projects
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-sky-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              
            </ul>
          </nav>
          
          <div className="flex items-center gap-4">
            <SignedOut>
              <div className="hidden md:flex items-center gap-3">
                <SignInButton>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-all">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full transition-all">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <UserButton />
              </div>
            </SignedIn>
          </div>
          
          <div className="block md:hidden">
            <button
              onClick={toggleNavbar}
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-2 text-white transition hover:opacity-90"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="mx-4 my-2 p-4 rounded-2xl bg-white shadow-lg">
            <ul className="space-y-1 text-sm">
              
              
              <li>
                <a href="#" className="block py-3 px-4 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-medium rounded-lg hover:bg-gray-50">
                  Projects
                </a>
              </li>
              
              <li className="pt-2">
                <SignedOut>
                  <div className="flex flex-col gap-2 pt-2 border-t">
                    <SignInButton>
                      <button className="w-full px-4 py-2 text-sm font-medium text-center text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg transition-all">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;