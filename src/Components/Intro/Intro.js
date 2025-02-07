import React, { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import gsap from "gsap";
import "./Intro.scss";

export default function Intro({ toggleCategory }) {
  const [categorySelected, setCategorySelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const category = ["films", "tvShows"];
  const introRef = useRef(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
    setCategorySelected(category[index]);
    // animate start button
    if (introRef.current) {
      const startBtn = introRef.current.querySelector(".start");
      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.out" },
      });

      tl.fromTo(
        startBtn,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3 }
      );
    }
  };

  // animate in
  useEffect(() => {
    if (introRef.current) {
      const elements = introRef.current.querySelectorAll("h1, p, .category");
      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.out" },
      });

      tl.fromTo(
        elements,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3 }
      );
    }
  }, []);

  return (
    <div className="intro" ref={introRef}>
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
