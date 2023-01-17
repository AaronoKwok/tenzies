import React from "react";

export default function Time({ time }) {
  return (
    <div>
      <span className="stopWatch">Duration of Play: </span>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      {/* 60000ms/min */}
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      {/* 1000ms/s */}
    </div>
  );
}
