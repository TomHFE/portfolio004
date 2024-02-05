import "./App.scss";

import Background from "./background/background";
import Homepage from "./homepage/homepage";
import Projects from "./projects/projects";

function App() {
  return (
    <div className="smooth-scroll-container">
      <div className="background">
        <Background />
        <div className="background-mask"></div>
      </div>
      <div id="background-mask"></div>
      <Homepage />
      <Projects />
    </div>
  );
}

export default App;
