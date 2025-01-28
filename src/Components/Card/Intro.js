import React, { useState } from "react";

export default function Intro({ toggleCategory }) {
  const [categorySelected, setCategorySelected] = useState(null);

  return (
    <div className="intro">
      <h1>Welcome to the Disney Quiz</h1>
      <p>What category of Disney character knowledge do you want to test?</p>
      <div className="category">
        <button
          type="button"
          value="films"
          onClick={() => setCategorySelected("films")}
        >
          Films
        </button>
        <button value="tvShows" onClick={() => setCategorySelected("tvShows")}>
          TV Shows
        </button>
      </div>
      <div className="start">
        {categorySelected && (
          <button value={categorySelected} onClick={toggleCategory}>
            Start quiz
          </button>
        )}
      </div>
    </div>
  );
}
