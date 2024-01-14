import "./App.scss";
import Background from "./background/background";
import Homepage from "./homepage/homepage";

function App() {
  return (
    <div>
      <div className="background">
        <Background />
      </div>
      <div id="background-mask"></div>
      <Homepage />
    </div>
  );
}

export default App;
