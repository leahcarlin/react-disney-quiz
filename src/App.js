import "./App.css";
import { useState } from "react";
import Card from "./Components/Card/Card.js";
import Intro from "./Components/Intro/Intro.js";
import "./App.scss";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [category, setCategory] = useState(null);
  const [count, setCount] = useState(1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleIntro = (category) => {
    setCategory(category);
    setIntroComplete(true);
  };
  const handleNext = (isCorrect) => {
    if (count >= 10) {
      setQuizFinished(true);
      return;
    }
    // track correct answers
    if (isCorrect) {
      setNumCorrect((prev) => prev + 1);
    }
    // track progress
    setCount((prev) => prev + 1);
  };

  return (
    <div className="App">
      {introComplete ? (
        quizFinished ? (
          <div>
            FINISHED! <div className="score">{numCorrect}</div>
          </div>
        ) : (
          <div className="quiz">
            <h1>Disney Quiz</h1>
            <div className="counter">{count}/10</div>
            <Card count={count} category={category} handleNext={handleNext} />
          </div>
        )
      ) : (
        <Intro toggleCategory={handleIntro} />
      )}
    </div>
  );
}

export default App;
