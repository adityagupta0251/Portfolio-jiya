// app/client-layout.js

"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const addSectionIds = () => {
      setTimeout(() => {
        const section = document.querySelector("section:first-of-type");
        if (!section) return;

        const routeToIdMap = {
          "/": "hero-section",
          "/about": "about-section",
          "/projects": "projects-section",
          "/blog": "blog-section",
          "/contactUs": "contact-section",
        };

        const id = routeToIdMap[pathname];
        if (id) section.id = id;
      }, 500);
    };

    addSectionIds();
  }, [pathname]);

  return (
    <ClerkProvider>
      <Navbar />
      <main className="pt-24 pb-24 min-h-screen">{children}</main>
      <Chatbot />
      <Footer />
    </ClerkProvider>
  );
}
