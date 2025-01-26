import React, { useState, useEffect } from "react";
import { getRandomChoices } from "../../store/actions";
import { shuffleArray } from "../../utils";

export default function Choices(character) {
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState("");
  const currentCharacter = character.character;
  console.log(currentCharacter);
  useEffect(() => {
    const getChoices = async () => {
      try {
        const data = await getRandomChoices("films", currentCharacter._id);
        // @ Todo: randomize
        const options = [...data, currentCharacter.films[0]];
        setChoices(shuffleArray(options));
      } catch (err) {
        setError(err.message);
      }
    };

    getChoices();
  }, [currentCharacter, currentCharacter._id]);

  const handleClick = (e) => {
    if (e.currentTarget.value === currentCharacter.films[0]) console.log(true);
  };
  // regex to clean up choices and remove any (film)
  const trimChoices = (choices) => {
    return choices.map((choice) => choice.replace(/\s?\(film\)\s?/g, ""));
  };
  return (
    <div>
      <ul className="choices">
        {error ? (
          <li>{error}</li>
        ) : choices.length > 0 ? (
          trimChoices(choices).map((choice, index) => (
            <li key={index}>
              <button value={choice} onClick={(e) => handleClick(e)}>
                {choice}
              </button>
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
}
