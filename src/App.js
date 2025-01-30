import "./App.css";
import { useState } from "react";
import Card from "./Components/Card/Card.js";
import Intro from "./Components/Card/Intro.js";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [category, setCategory] = useState(null);
  const [cardKey, setCardKey] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleIntro = (e) => {
    setCategory(e.target.value);
    setIntroComplete(true);
  };
  const handleNext = () => {
    if (cardKey < 10) {
      setCardKey((prevKey) => prevKey + 1);
    } else setQuizFinished(true);
  };
  return (
    <div className="App">
      {introComplete ? (
        <div className="quiz">
          <h1>Disney Quiz</h1>
          <Card cardKey={cardKey} category={category} handleNext={handleNext} />
          <p>{cardKey}</p>
        </div>
      ) : (
        <Intro toggleCategory={handleIntro} />
      )}
    </div>
  );
}

export default App;
