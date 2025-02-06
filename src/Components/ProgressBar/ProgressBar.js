import React from "react";

export default function ProgressBar({ count }) {
  const totalQuestions = 10;
  // Calculate the progress percentage
  const progress = count === 1 ? 0 : (count / totalQuestions) * 100;
  return (
    <div>
      <div
        style={{
          width: "50%",
          backgroundColor: "#e0e0e0",
          height: "10px",
          borderRadius: "5px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(to right,rgb(35, 244, 143), #06ba63ff, #103900ff)",
            height: "100%",
            borderRadius: "5px",
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>
    </div>
  );
}
