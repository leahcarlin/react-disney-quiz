import React, { useState, useEffect } from "react";
import { getRandomCharacter } from "../../store/actions";
import Choices from "../Choices/Choices";
import "./Card.scss";

export default function Card({
  category,
  count,
  usedCharacterIds,
  handleNext,
}) {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const data = await getRandomCharacter(category, usedCharacterIds);
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getCharacter();
  }, [category, count, usedCharacterIds]);
  return (
    <div className="card">
      {error ? (
        <h2>{error}</h2>
      ) : character ? (
        <div>
          <p className="prompt">
            Name the Disney film this character appears in{" "}
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
            handleNext={handleNext}
            count={count}
          />
        </div>
      ) : null}
    </div>
  );
}
