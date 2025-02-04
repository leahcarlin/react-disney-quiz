import React, { useState, useEffect, useCallback } from "react";
import { getRandomChoices } from "../../store/actions";
import { shuffleArray } from "../../utils";
import "./Choices.scss";
import Button from "../Button/Button";
import CheckFillIcon from "../../assets/images/icon_circle_fill.svg";
import CloseIcon from "../../assets/images/icon_x.svg";

export default function Choices({ category, character, count, handleNext }) {
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

  useEffect(() => {
    setSelected(null);
    setChoices([]);
  }, [count]);

  const handleClick = (e) => {
    e.stopPropagation();
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
                style={{ pointerEvents: selected ? "none" : "all" }}
                className={`choice ${
                  selected
                    ? choice === character[category][0]
                      ? "correct"
                      : "incorrect"
                    : ""
                } ${choice === selected ? "selected" : ""} `}
              >
                <div className="index">{index + 1}</div>
                <div className="text">{choice}</div>
                <div className="mark">
                  {selected && choice === character[category][0] ? (
                    <img src={CheckFillIcon} alt="Icon" />
                  ) : choice === selected ? (
                    <img src={CloseIcon} alt="Icon" />
                  ) : null}
                </div>
              </button>
            </li>
          ))
        ) : null}
      </ul>
      {selected && (
        <Button
          type="primary"
          value={selected === character[category][0]}
          title="Next"
          handleSubmit={() => handleNext(selected === character[category][0])}
        />
      )}
    </div>
  );
}
