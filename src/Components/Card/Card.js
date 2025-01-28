import React, { useState, useEffect } from "react";
import { getRandomCharacter } from "../../store/actions";
import Character from "./Character";
import Choices from "./Choices";

export default function Card(props) {
  const { category } = props;
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const data = await getRandomCharacter(category);
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getCharacter();
  }, [category]);
  return (
    <div className="card">
      {error ? (
        <h2>{error}</h2>
      ) : character ? (
        <div>
          <h2>Name the Disney film this character appears in </h2>
          <Character character={character} />
          <Choices character={character} category={category} />
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
