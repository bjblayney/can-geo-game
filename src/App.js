// src/App.jsx
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import ProvinceCard from './components/ProvinceCard';
import Score from './components/Score';
import provincesData from './data/provinces';

const App = () => {
  const [currentProvince, setCurrentProvince] = useState(null);
  const [score, setScore] = useState(0);
  const [showCapital, setShowCapital] = useState(false);
  const [hints, setHints] = useState(3);

  useEffect(() => {
    // Initialize first province
    getRandomProvince();
  }, []);

  const getRandomProvince = () => {
    const randomIndex = Math.floor(Math.random() * provincesData.length);
    setCurrentProvince(provincesData[randomIndex]);
    setShowCapital(false);
  };

  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 1);
    getRandomProvince();
  };

  const handleUseHint = () => {
    if (hints > 0) {
      setShowCapital(true);
      setHints((prevHints) => prevHints - 1);
    }
  };

  const handleSelectProvince = (selectedName) => {
    console.log(selectedName);
    // if (currentProvince && currentProvince.name.toLowerCase() === selectedName.toLowerCase()) {
    //   handleCorrectAnswer();
    // } else {
    //   alert('Incorrect! Try again.');
    // }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Canadian Geography</h1>
      <Map onSelectProvince={handleSelectProvince} currentProvince={currentProvince} />

      <Score score={score} />
      {currentProvince && (
        <ProvinceCard province={currentProvince} onCorrect={handleCorrectAnswer} onHint={handleUseHint} showCapital={showCapital} hintsLeft={hints} />
      )}
    </div>
  );
};

export default App;
