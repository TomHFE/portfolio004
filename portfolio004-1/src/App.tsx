import "./App.scss";
import Background from "./background/background";
import Homepage from "./homepage/homepage";
import Projects from "./projects/projects";

function App() {
  return (
    <div>
      <div className="background">
        <Background />
      </div>
      <div id="background-mask"></div>
      <Homepage />
      <Projects />
    </div>
  );
}

export default App;
