// src/components/ProvinceCard.jsx
import React, { useState } from 'react';

const ProvinceCard = ({ province, onCorrect, onHint, showCapital, hintsLeft }) => {
  const [provinceName, setProvinceName] = useState('');
  const [capitalName, setCapitalName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (provinceName.trim().toLowerCase() === province.name.toLowerCase() && capitalName.trim().toLowerCase() === province.capital.toLowerCase()) {
      onCorrect();
      setProvinceName('');
      setCapitalName('');
      setError('');
    } else {
      setError('Incorrect answers. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 w-full max-w-md text-center">
      <h2 className="text-xl mb-2">Identify the Province and its Capital</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Province Name"
          value={provinceName}
          onChange={(e) => setProvinceName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder={showCapital ? province.capital : 'Capital Name'}
          value={capitalName}
          onChange={(e) => setCapitalName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Submit
        </button>
      </form>
      <button
        onClick={onHint}
        disabled={hintsLeft === 0}
        className={`mt-2 p-2 rounded ${hintsLeft > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'} text-white`}
      >
        {hintsLeft > 0 ? `Show Capital (Hints = ${hintsLeft})` : 'No Hints Left'}
      </button>
    </div>
  );
};

export default ProvinceCard;
