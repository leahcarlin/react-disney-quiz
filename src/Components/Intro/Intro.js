import React, { useState } from "react";
import Button from "../Button/Button";
import "./Intro.scss";

export default function Intro({ toggleCategory }) {
  const [categorySelected, setCategorySelected] = useState(null);

  return (
    <div className="intro">
      <h1>Welcome to the Disney Quiz</h1>
      <p>What category of Disney character knowledge do you want to test?</p>
      <div className="category">
        <Button
          title="Films"
          handleSubmit={() => setCategorySelected("films")}
          type="secondary"
        />
        <Button
          title="TV Shows"
          handleSubmit={() => setCategorySelected("tvShows")}
          type="secondary"
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
