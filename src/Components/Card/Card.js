import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Choices from "../Choices/Choices";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Card.scss";
import { shuffleArray } from "../../utils";
import Loading from "../../assets/images/loading.gif";

export default function Card({ category, characters, count, handleNext }) {
  const [character, setCharacter] = useState(null);
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState(null);
  const [loadComplete, setLoadComplete] = useState(false);
  const cardRef = useRef(null);

  // Fetch new character & choices on count change
  useEffect(() => {
    const getCharacter = async () => {
      setLoadComplete(false); // reset load state

      try {
        const characterData = characters.getRandomCharacter();
        const choicesData = characters.getRandomChoices(
          category,
          characterData._id
        );
        const options = shuffleArray([
          ...choicesData,
          characterData[category][0],
        ]);

        setCharacter(characterData);
        setChoices(options);
        setLoadComplete(true); // trigger animation after load
      } catch (err) {
        setError(err.message);
      }
    };

    getCharacter();
  }, [category, characters, count]);

  // Animate card IN after loadComplete
  useEffect(() => {
    if (loadComplete && character && cardRef.current) {
      gsap.set(cardRef.current, { x: 300, opacity: 0 });
      gsap.to(cardRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [loadComplete, character]);

  // Animate card OUT, then trigger next question
  const handleChoice = (e) => {
    gsap.to(cardRef.current, {
      x: -300,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setCharacter(null);
        setChoices([]);
        handleNext(e);
      },
    });
  };

  return (
    <div className="card">
      {error ? (
        <h2>{error}</h2>
      ) : loadComplete ? (
        <div>
          <div className="header">
            <h1>Disney Quiz</h1>
            <ProgressBar count={count} />
          </div>
          {character ? (
            <div className="card-container" ref={cardRef} key={count}>
              <p className="prompt">
                Name the Disney film this character appears in:
              </p>
              <div className="character">
                <div className="image">
                  <img src={character.imageUrl} alt={character.name} />
                </div>
                <h3>{character.name}</h3>
              </div>
              <Choices
                character={character}
                choices={choices}
                category={category}
                count={count}
                handleNext={handleChoice}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <img src={Loading} alt="loading" />
      )}
    </div>
  );
}
