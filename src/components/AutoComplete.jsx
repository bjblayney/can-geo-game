import React, { useState, useEffect } from 'react';
import provinces from '../data/provinces'; // Your provinces and territories list

const Autocomplete = ({ setProvinceName, resetInput }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Handle input change and filter suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setProvinceName(value);

    if (value) {
      const filteredSuggestions = provinces.filter((province) => province.name.toLowerCase().startsWith(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (name) => {
    // console.log(name);
    setInputValue(name);
    setProvinceName(name);
    setSuggestions([]);
  };

  useEffect(() => {
    // console.log(resetInput);
    if (resetInput) {
      setInputValue(''); // Reset the input field
    }
  }, [resetInput]);

  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 200); // 200ms delay to allow time for interaction
        }}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Start typing a province or territory"
        required
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded w-full max-h-48 overflow-y-auto z-10">
          {suggestions.map((suggestion) => (
            <li key={suggestion.name} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleSuggestionClick(suggestion.name)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
