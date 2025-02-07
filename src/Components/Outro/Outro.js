import React from "react";
import "./Outro.scss";
import Button from "../Button/Button";
import royaltyImg from "../../assets/images/img_royalty.jpg";
import magicImg from "../../assets/images/img_magic.jpg";
import explorerImg from "../../assets/images/img_explorer.jpg";

export default function Outro({ category, numCorrect, handleSubmit }) {
  const resultText = [
    {
      title: "Disney Royalty",
      description: `You are the ultimate Disney fan! You know ${category} like the back of Mickey’s glove. You probably sing along to every Disney soundtrack and can quote Disney classics by heart. Consider yourself a true Disney connoisseur!`,
      img: royaltyImg,
      minScore: 9,
    },
    {
      title: "Magic in Your Heart",
      description:
        "You’ve got a solid grasp of Disney magic! Maybe you grew up watching the classics, or perhaps you've kept up with new releases. Either way, you know your way around the Disney kingdom. A little more pixie dust, and you’ll be an expert!",
      img: magicImg,
      minScore: 6,
    },
    {
      title: "Casual Disney Explorer",
      description:
        "You enjoy Disney, but you might not be living in the magic 24/7—and that’s okay! Whether you’re more into the theme parks, the newer releases, or just starting your Disney journey, there’s always more to explore. Time for a Disney movie marathon?",
      img: explorerImg,
      minScore: 0,
    },
  ];

  // Determine the correct result based on numCorrect
  const result = resultText.find((entry) => numCorrect >= entry.minScore);

  return (
    <div className="outro">
      <h2 className="score">Score: {numCorrect} / 10</h2>
      <h1>{result.title}</h1>
      <div className="image">
        <img src={result.img} alt="result" />
      </div>
      <h3>{result.description}</h3>
      <Button title="Start over" type="primary" handleSubmit={handleSubmit} />
    </div>
  );
}
