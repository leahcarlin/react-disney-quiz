import React from "react";
import "./Button.scss";

export default function Button({
  title,
  value,
  type,
  isSelected,
  handleSubmit,
}) {
  return (
    <div
      className={`button ${type} ${isSelected ? "selected" : ""}`}
      type="button"
      value={value ?? title}
      onClick={() => handleSubmit(value ?? title)}
    >
      {title}
    </div>
  );
}
