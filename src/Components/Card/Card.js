import React, { useState, useEffect } from "react";
import { getRandomCharacter } from "../../store/actions";
import Character from "./Character";
import Choices from "./Choices";

export default function Card() {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  // @Todo: add filter for films vs. tvShows
  useEffect(() => {
    const getCharacter = async () => {
      try {
        const data = await getRandomCharacter("films");
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getCharacter();
  }, []);
  return (
    <div className="card">
      {error ? (
        <h2>{error}</h2>
      ) : character ? (
        <div>
          <h2>Name the Disney film this character appears in </h2>
          <Character character={character} />
          <Choices character={character} />
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
