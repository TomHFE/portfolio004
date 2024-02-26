import "./App.scss";
import { useState } from "react";
import Background from "./background/background";
import Projects from "./projects/projects";
import AboutSection from "./about-section/about-section";
import { Routes, Route } from "react-router-dom";

function App() {
  // set initial animation hook
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  // handle animation
  const handleIsAnim: () => void = () => {
    setIsAnimated(true);
  };

  // dom
  return (
    <div>
      {/* background */}
      <div className="background">
        <Background isAnim={isAnimated} />
      </div>
      <Routes>
        {/* site */}
        <Route
          path="/"
          element={<Projects isAnim={isAnimated} handleIsAnim={handleIsAnim} />}
        ></Route>
        <Route path="/about" element={<AboutSection />}></Route>
      </Routes>
    </div>
  );
}

export default App;
