import React, { useState } from 'react';
import './RainbowButton.css';

const RainbowButton = () => {
  const [isFlashing, setIsFlashing] = useState(false);

  const handleClick = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 1000); // You can adjust the duration of the flashing effect
  };

  return (
    <button
      className={`rainbow-button ${isFlashing ? 'flash' : ''}`}
      onClick={handleClick}
    >
      Click me!
    </button>
  );
};

export default RainbowButton;
