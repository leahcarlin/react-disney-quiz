import "./App.scss";
import { useState, useRef } from "react";
import Card from "./Components/Card/Card.js";
import Intro from "./Components/Intro/Intro.js";
import Outro from "./Components/Outro/Outro.js";
import { Characters } from "./store/Characters.js";
import { getFilteredCharacters } from "./store/actions.js";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [category, setCategory] = useState(null);
  const [count, setCount] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const charactersRef = useRef(null);

  const handleIntro = async (category) => {
    setCategory(category);

    // fetch available characters based on category
    const filteredCharacters = await getFilteredCharacters(category);
    charactersRef.current = new Characters(filteredCharacters);
    // start quiz
    setIntroComplete(true);
  };

  const handleNext = (e) => {
    if (count >= 10) {
      setQuizFinished(true);
      return;
    }

    if (e.isCorrect) {
      setNumCorrect((prev) => prev + 1);
    }

    charactersRef.current.addUsedCharacterId(e.characterId);
    setCount((prev) => prev + 1);
    setSelected(null);
  };

  const triggerStart = () => {
    setCount(0);
    setQuizFinished(false);
    setIntroComplete(false);
    setCategory(null);
    setNumCorrect(0);
    setSelected(null);
    charactersRef.current = null;
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
              characters={charactersRef.current}
              selected={selected}
              category={category}
              handleNext={handleNext}
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
