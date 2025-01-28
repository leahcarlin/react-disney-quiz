import React, { useState, useEffect } from "react";
import { getRandomChoices } from "../../store/actions";
import { shuffleArray } from "../../utils";

export default function Choices(props) {
  const { character, category } = props;
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getChoices = async () => {
      try {
        const data = await getRandomChoices(category, character._id);

        const options = [...data, character[category][0]];
        setChoices(shuffleArray(options));
      } catch (err) {
        setError(err.message);
      }
    };

    getChoices();
  }, [category, character]);

  const handleClick = (e) => {
    if (e.currentTarget.value === character[category][0]) console.log(true);
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
