import React from "react";
import "./Button.scss";

export default function Button({ title, value, type, handleSubmit }) {
  return (
    <div
      className={`button ${type}`}
      type="button"
      value={value ?? title}
      onClick={() => handleSubmit(value ?? title)}
    >
      {title}
    </div>
  );
}
