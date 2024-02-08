import "./App.scss";
import { useState } from "react";
import Background from "./background/background";
import Homepage from "./homepage/homepage";
import Projects from "./projects/projects";
import About from "./about/about";
import Contact from "./contact/contact";

function App() {
  // const targetRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const handleIsAnim: () => void = () => {
    setIsAnimated(true);
  };

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setIsAnimated(true);
  //           console.log(isAnimated);
  //           console.log(`test ${isAnimated}`);
  //           // Perform actions when the target element is visible
  //         } else {
  //           setIsAnimated(false);

  //           console.log(isAnimated);
  //           // Perform actions when the target element is not visible
  //         }
  //       });
  //     },
  //     {
  //       root: null, // Use the viewport as the root
  //       rootMargin: "0px", // No margin around the root
  //       threshold: 0.5, // Fire the callback when 50% of the target is visible
  //     }
  //   );

  //   if (targetRef.current) {
  //     observer.observe(targetRef.current);
  //   }

  //   return () => {
  //     if (targetRef.current) {
  //       observer.unobserve(targetRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div>
      <div className="background">
        <Background isAnim={isAnimated} />
        {/* <div className="background-mask"></div> */}
      </div>

      {/* <div id="background-mask"></div> */}
      {/* <Homepage /> */}
      <Projects isAnim={isAnimated} handleIsAnim={handleIsAnim} />
      {/* <About />
      <Contact /> */}
    </div>
  );
}

export default App;
