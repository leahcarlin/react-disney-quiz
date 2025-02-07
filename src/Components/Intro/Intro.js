import React, { useState } from "react";
import Button from "../Button/Button";
import "./Intro.scss";

export default function Intro({ toggleCategory }) {
  const [categorySelected, setCategorySelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const category = ["films", "tvShows"];

  const handleClick = (index) => {
    setSelectedIndex(index);
    setCategorySelected(category[index]);
  };

  return (
    <div className="intro">
      <h1>Welcome to the Disney Quiz</h1>
      <p>What category of Disney character knowledge do you want to test?</p>
      <div className="category">
        <Button
          title="Films"
          handleSubmit={() => handleClick(0)}
          type="secondary"
          value={category[0]}
          isSelected={category[selectedIndex] === category[0]}
        />
        <Button
          title="TV Shows"
          handleSubmit={() => handleClick(1)}
          type="secondary"
          value={category[1]}
          isSelected={category[selectedIndex] === category[1]}
        />
      </div>
      <div className="start">
        {categorySelected && (
          <Button
            value={categorySelected}
            title="Start quiz"
            handleSubmit={toggleCategory}
            type="primary"
          />
        )}
      </div>
    </div>
  );
}
