import React, { useState, useEffect } from "react";
import { getRandomChoices } from "../../store/actions";

export default function Choices(character) {
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState("");
  const currentCharacter = character.character;
  
  useEffect(() => {
    const getChoices = async () => {
      try {
        const data = await getRandomChoices("films", currentCharacter._id);
        console.log("DATA", data);
        const rawChoices = [...data, currentCharacter.films[0]];
        // some answers have (film) in the title, remove it to clean it up
        const edited = rawChoices.map((choice) =>
          choice.replace(/\s?\(film\)\s?/g, "")
        );
        setChoices(edited);
      } catch (err) {
        setError(err.message);
      }
    };

    getChoices();
  }, [currentCharacter, currentCharacter._id]);
  console.log("CHJOICES", choices);
  return (
    <div>
      <ul className="choices">
        {error ? (
          <li>{error}</li>
        ) : choices.length > 0 ? (
          choices.map((choice, index) => (
            <li key={index}>
              <button>{choice}</button>
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
}
