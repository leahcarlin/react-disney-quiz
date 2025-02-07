import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Choices from "../Choices/Choices";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Card.scss";
import { getRandomCharacter, getRandomChoices } from "../../store/actions";
import { shuffleArray } from "../../utils";

export default function Card({
  category,
  count,
  usedCharacterIds,
  handleNext,
}) {
  const [character, setCharacter] = useState(null);
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState(null);
  const [loadComplete, setLoadComplete] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    setLoadComplete(false);
    const getCharacter = async () => {
      try {
        // get character
        const characterData = await getRandomCharacter(
          category,
          usedCharacterIds
        );
        setCharacter(characterData);
        // get choices
        const choicesData = await getRandomChoices(category, characterData._id);
        const options = [...choicesData, characterData[category][0]];
        setChoices(shuffleArray(options));
        setLoadComplete(true);
      } catch (err) {
        setError(err.message);
      }
    };

    getCharacter();
  }, [category, count, usedCharacterIds]);

  // Animate card IN after loadComplete is true
  useEffect(() => {
    if (loadComplete && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [loadComplete]);

  // Animate card OUT to the left
  const handleChoice = (e) => {
    gsap.to(cardRef.current, {
      x: -300,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => handleNext(e),
    });
  };

  return (
    <div className="card">
      {error ? (
        <h2>{error}</h2>
      ) : character ? (
        <div>
          <div className="header">
            <h1>Disney Quiz</h1>
            <ProgressBar count={count} />
          </div>
          <div className="card-container" ref={cardRef}>
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
        </div>
      ) : null}
    </div>
  );
}
