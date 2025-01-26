import React from "react";

export default function Character(props) {
  const { character } = props;
  return (
    <div className="character">
      <img src={character.imageUrl} alt={character.name} />
      <h3>{character.name}</h3>
    </div>
  );
}
