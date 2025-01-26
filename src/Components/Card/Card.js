import React, { useState, useEffect } from "react";
import { getRandomCharacter } from "../../store/actions";

export default function Card() {
  const [character, setCharacter] = useState(null); // State for the character object
  const [error, setError] = useState(null); // State for handling errors


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
          <img src={character.imageUrl} alt={character.name} />
          <h2>{character.name}</h2>{" "}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
