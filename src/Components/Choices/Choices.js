import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
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
  const nextBtnRef = useRef(null);

  useEffect(() => {
    setSelected(null);
  }, [count]);

  // next button animtation
  useEffect(() => {
    if (selected && nextBtnRef.current) {
      gsap.fromTo(
        nextBtnRef.current,
        { x: 0 },
        {
          x: 10,
          duration: 0.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, [selected]);

  const handleClick = (choice) => {
    setSelected(choice);
  };
  return (
    <div className="choices-container">
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
                  } ${choice === selected ? "selected" : ""} ${
                    selected ? "disabled" : ""
                  }`}
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
      <h3
        className={`response ${
          selected
            ? selected === character[category][0]
              ? "correct"
              : "incorrect"
            : ""
        }`}
      >
        {selected
          ? selected === character[category][0]
            ? "Correct!"
            : "Incorrect"
          : ""}
      </h3>
      {selected && (
        <div className="next-btn" ref={nextBtnRef}>
          <Button
            type="primary"
            value={selected === character[category][0]}
            title=">"
            handleSubmit={() =>
              handleNext({
                selected: selected,
                isCorrect: selected === character[category][0],
                characterId: character._id,
              })
            }
          />
        </div>
      )}
    </div>
  );
}
