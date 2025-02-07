import React, { useState, useEffect, useRef } from "react";
import { getRandomCharacter } from "../../store/actions";
import Choices from "../Choices/Choices";
import { gsap } from "gsap";
import "./Card.scss";

export default function Card({
  category,
  count,
  usedCharacterIds,
  handleNext,
}) {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const cardRef = useRef(null); // Reference for the card

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const data = await getRandomCharacter(category, usedCharacterIds);
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      }
    };

    // animate card IN from the right
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: 300, opacity: 0 }, // Start off-screen right
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    getCharacter();
  }, [category, count, usedCharacterIds]);

  // animate card OUT to the left
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
    <div className="card" ref={cardRef}>
      {error ? (
        <h2>{error}</h2>
      ) : character ? (
        <div>
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
            category={category}
            handleNext={handleChoice}
            count={count}
          />
        </div>
      ) : null}
    </div>
  );
}
