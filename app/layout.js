import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
 // ✅ Make sure this path is correct



export const metadata = {
  title: "I'm Jiya",
  description: "Jayanti shaw a Java & Python Developer & also haved or passinate about AI & ML & Web development",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
