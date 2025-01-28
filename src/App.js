import "./App.css";
import { useState } from "react";
import Card from "./Components/Card/Card.js";
import Intro from "./Components/Card/Intro.js";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [category, setCategory] = useState(null);

  const handleIntro = (e) => {
    setCategory(e.target.value);
    setIntroComplete(true);
  };
  return (
    <div className="App">
      {introComplete ? (
        <div className="quiz">
          <h1>Disney Quiz</h1>
          <Card category={category} />
        </div>
      ) : (
        <Intro toggleCategory={handleIntro} />
      )}
    </div>
  );
}

export default App;
