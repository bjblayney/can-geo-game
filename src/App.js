// src/App.jsx
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import ProvinceCard from './components/ProvinceCard';
import Score from './components/Score';
import provincesData from './data/provinces';

const App = () => {
  const [provinces, setProvinces] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProvince, setCurrentProvince] = useState(null);
  const [score, setScore] = useState(0);
  const [showCapital, setShowCapital] = useState(false);
  const [hints, setHints] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Shuffle the provincesData at the start of the game
    const shuffledProvinces = shuffleProvinces(provincesData);
    setProvinces(shuffledProvinces);
    setCurrentProvince(shuffledProvinces[0]); // Set the first province
    console.log(shuffledProvinces);
  }, []);

  const nextProvince = () => {
    if (currentIndex < provinces.length - 1) {
      // Move to the next province if there's more
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentProvince(provinces[nextIndex]);
      setShowCapital(false); // Reset capital display
      console.log(provinces[nextIndex]);
    } else {
      // End the game if no more provinces
      console.log('Game Over!');
      setGameOver(true);
    }
  };

  // Fisher-Yates shuffle algorithm to shuffle provinces
  const shuffleProvinces = (provinces) => {
    let shuffled = [...provinces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 1);
    // getRandomProvince();
    nextProvince();
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
      <Map onSelectProvince={handleSelectProvince} currentProvince={currentProvince} showCapital={showCapital} gameOver={gameOver} />

      <Score score={score} />
      {currentProvince && (
        <ProvinceCard
          province={currentProvince}
          onCorrect={handleCorrectAnswer}
          onHint={handleUseHint}
          showCapital={showCapital}
          hintsLeft={hints}
          gameOver={gameOver}
        />
      )}
    </div>
  );
};

export default App;
