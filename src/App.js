import "./App.css";
import { useState } from "react";
import Card from "./Components/Card/Card.js";
import Intro from "./Components/Intro/Intro.js";
import ProgressBar from "./Components/ProgressBar/ProgressBar.js";
import Outro from "./Components/Outro/Outro.js";
import "./App.scss";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [category, setCategory] = useState(null);
  const [count, setCount] = useState(1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [usedCharacterIds, setUsedCharacterIds] = useState([]);

  const handleIntro = (category) => {
    setCategory(category);
    setIntroComplete(true);
  };
  const handleNext = (e) => {
    if (count >= 10) {
      setQuizFinished(true);
      return;
    }
    // track correct answers
    if (e.isCorrect) {
      setNumCorrect((prev) => prev + 1);
    }
    // track progress
    setCount((prev) => prev + 1);
    // add character id to prevent duplication
    // add character id to prevent duplication
    setUsedCharacterIds((prev) => [...prev, e.characterId]);
  };

  return (
    <div className="App">
      {introComplete ? (
        quizFinished ? (
          <Outro numCorrect={numCorrect} />
        ) : (
          <div className="quiz">
            <h1>Disney Quiz</h1>
            <ProgressBar count={count} />
            <Card
              count={count}
              category={category}
              handleNext={handleNext}
              usedCharacterIds={usedCharacterIds}
            />
          </div>
        )
      ) : (
        <Intro toggleCategory={handleIntro} />
      )}
    </div>
  );
}

export default App;
