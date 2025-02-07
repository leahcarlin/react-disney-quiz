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
  const [selected, setSelected] = useState(null);

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
    setUsedCharacterIds((prev) => [...prev, e.characterId]);

    // next button visibility
    setSelected(e.selected);
  };

  const triggerStart = () => {
    setCount(1); // reset count
    setQuizFinished(false);
    setIntroComplete(false);
    setCategory(null);
    setUsedCharacterIds([]);
    setNumCorrect(0);
    setSelected(null);
  };

  return (
    <div className="App">
      {introComplete ? (
        quizFinished ? (
          <Outro
            numCorrect={numCorrect}
            category={category}
            handleSubmit={triggerStart}
          />
        ) : (
          <div className="quiz">
            <Card
              count={count}
              selected={selected}
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
