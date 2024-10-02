// src/components/Score.jsx
import React from 'react';

const Score = ({ score }) => {
  return (
    <div className="mb-4">
      <p className="text-lg">
        Score: <span className="font-bold">{score}</span>
      </p>
    </div>
  );
};

export default Score;
