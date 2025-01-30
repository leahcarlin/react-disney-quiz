import React, { useState, useEffect, useCallback } from "react";
import { getRandomChoices } from "../../store/actions";
import { shuffleArray } from "../../utils";

export default function Choices({ category, character, handleNext }) {
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const getChoices = useCallback(async () => {
    try {
      const data = await getRandomChoices(category, character._id);
      const options = [...data, character[category][0]];
      setChoices(shuffleArray(options));
    } catch (err) {
      setError(err.message);
    }
  }, [category, character]);

  useEffect(() => {
    if (character) {
      getChoices();
    }
  }, [character, getChoices]);

  const handleClick = (e) => {
    setSelected(e.target.value);
  };
  // regex to clean up choices and remove any (film) or (TV series)
  const trimChoices = (choices) => {
    return choices.map((choice) =>
      choice.replace(/\s?\((film|TV series)\)\s?/g, "")
    );
  };

  return (
    <div>
      {selected ? (
        selected === character[category][0] ? (
          <h3 className="correct">Correct!</h3>
        ) : (
          <h3 className="incorrect">Incorrect</h3>
        )
      ) : null}
      <ul className="choices">
        {error ? (
          <li>{error}</li>
        ) : choices.length > 0 ? (
          trimChoices(choices).map((choice, index) => (
            <li key={index}>
              <button
                value={choice}
                onClick={(e) => handleClick(e)}
                className={
                  selected
                    ? choice === character[category][0]
                      ? "correct"
                      : "incorrect"
                    : ""
                }
              >
                {choice}
              </button>
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
      {selected && (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
}
