import { useRef, useEffect } from "react";
import About from "../about/about";
import Contact from "../contact/contact";

export default function AboutSection() {
  // scroll lock ref
  const scrollRef = useRef(null);

  useEffect(() => {
    // styles to prevent scrolling on the body
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // For older browsers
    document.body.style.scrollBehavior = "smooth";
    // timer to disable scroll lock
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.scrollBehavior = "";
    }, 1000);
    return () => {
      // clear timer
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
