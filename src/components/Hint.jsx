// src/components/Hint.jsx
import React from 'react';

const Hint = ({ onUseHint, hintsLeft }) => {
  return (
    <button
      onClick={onUseHint}
      disabled={hintsLeft === 0}
      className={`p-2 rounded ${hintsLeft > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'} text-white`}
    >
      {hintsLeft > 0 ? 'Use Hint' : 'No Hints Left'}
    </button>
  );
};

export default Hint;
