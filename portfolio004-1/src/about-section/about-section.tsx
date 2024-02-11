import React, { useRef, useEffect } from "react";
import About from "../about/about";
import Contact from "../contact/contact";
import "./about-section.scss";
// import Scroll from "./scroll";

export default function AboutSection() {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Apply styles to prevent scrolling on the body
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // For older browsers
    document.body.style.scrollBehavior = "smooth";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.scrollBehavior = "";
      console.log("timer");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <div className="about-body" ref={scrollRef}>
        <About />
      </div>
      <Contact />
    </div>
  );
}

// html, body {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   overflow: auto;
// }
