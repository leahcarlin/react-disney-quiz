import React, { useState, useEffect } from "react";
import "./Choices.scss";
import Button from "../Button/Button";
import CheckFillIcon from "../../assets/images/icon_circle_fill.svg";
import CloseIcon from "../../assets/images/icon_x.svg";

export default function Choices({
  character,
  choices,
  category,
  count,
  handleNext,
  onComplete,
}) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [count]);

  const handleClick = (choice) => {
    setSelected(choice);
  };
  return (
    <div>
      {selected ? (
        selected === character[category][0] ? (
          <h3 className="response correct">Correct!</h3>
        ) : (
          <h3 className="response incorrect">Incorrect</h3>
        )
      ) : null}
      <ul className="choices">
        {choices.length > 0
          ? choices.map((choice, index) => (
              <li key={index} onClick={() => !selected && handleClick(choice)}>
                <button
                  value={choice}
                  disabled={selected}
                  className={`choice ${
                    selected
                      ? choice === character[category][0]
                        ? "correct"
                        : "incorrect"
                      : ""
                  } ${choice === selected ? "selected" : ""}`}
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
          : null}
      </ul>
      {selected && (
        <Button
          type="primary"
          value={selected === character[category][0]}
          title="Next"
          handleSubmit={() =>
            handleNext({
              selected: selected,
              isCorrect: selected === character[category][0],
              characterId: character._id,
            })
          }
        />
      )}
    </div>
  );
}
