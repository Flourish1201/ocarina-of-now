import React, { useState, useEffect } from 'react';

export default function InteractiveOcarina() {
  const [selectedImage, setSelectedImage] = useState('/assets/ocarina.png');
  const [keySequence, setKeySequence] = useState([]);
  const [pressedKeys, setPressedKeys] = useState({});

  const handleImageChange = (event) => {
    setSelectedImage(event.target.value);
  };

  const keySequenceToImageMap = {
    'PIXEL': '/assets/ocarina-pixel.png',
    'COLOR': '/assets/ocarina-rainbow.gif',
    'INVIS': '/assets/ocarina-invisible.png',
    'GHOST': '/assets/ocarina-ghost.png',
  };

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const newKeySequence = [...keySequence, key].slice(-5); // Keep only the last 5 keys
    setKeySequence(newKeySequence);
    setPressedKeys((prev) => ({ ...prev, [key]: true }));

    const sequenceString = newKeySequence.join('');
    if (keySequenceToImageMap[sequenceString]) {
      setSelectedImage(keySequenceToImageMap[sequenceString]); // Change to the desired image
    }
  };

  const handleKeyRelease = (event) => {
    const key = event.key.toUpperCase();
    setPressedKeys((prev) => ({ ...prev, [key]: false }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRelease);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyRelease);
    };
  }, [keySequence]);

  const getKbdClass = (key) => {
    return pressedKeys[key] ? 'kbd kbd-xl bg-primary bg-neutral' : 'kbd kbd-xl text-primary';
  };

  return (
    <div className="relative flex flex-col items-center h-screen">
      {/* Dropdown for selecting the ocarina image */}
      <div className="absolute top-4 right-4 mb-4">
        <label htmlFor="ocarina-select" className="mr-2">Select Ocarina:</label>
        <select id="ocarina-select" onChange={handleImageChange} className="select select-accent">
          <option value="/assets/ocarina.png">Original</option>
          <option value="/assets/ocarina-yellow.png">Yellow</option>
          <option value="/assets/ocarina-red.png">Red</option>
          <option value="/assets/ocarina-orange.png">Orange</option>
          <option value="/assets/ocarina-green.png">Green</option>
          <option value="/assets/ocarina-light-blue.png">Light Blue</option>
          <option value="/assets/ocarina-purple.png">Purple</option>
          <option value="/assets/ocarina-pink.png">Pink</option>
          <option value="/assets/ocarina-black.png">Black</option>
          <option value="/assets/ocarina-white.png">White</option>
        </select>
      </div>

      {/* Center the content and use text-center for centering text */}
      <div className="relative inline-block text-center">
        {/* Center the image container and add margin-bottom */}
        <div className="relative w-1/2 mx-auto mb-4">
          {/* Ensure the image scales correctly */}
          <div className="relative w-full h-64">
            <img src={selectedImage} className="absolute inset-0 w-full h-full object-contain rotate-35" alt="Ocarina" />
          </div>
        </div>
        {/* Use flex to position the kbd containers next to each other */}
        <div className="relative z-40 flex justify-center">
          {/* WASD container */}
          <div className="relative flex flex-col items-center mr-20">
            <div className="mb-2">
              <kbd className={getKbdClass('W')}>W</kbd>
            </div>
            <div className="flex justify-center gap-12 mb-2">
              <kbd className={getKbdClass('A')}>A</kbd>
              <kbd className={getKbdClass('D')}>D</kbd>
            </div>
            <div className="mb-2">
              <kbd className={getKbdClass('S')}>S</kbd>
            </div>
          </div>

          {/* HJK container */}
          <div className="relative flex flex-col items-center">
            <div className="flex justify-center space-x-2 mt-10">
              <kbd className={getKbdClass('H')}>H</kbd>
              <div className="relative top-5">
                <kbd className={getKbdClass('J')}>J</kbd>
              </div>
              <kbd className={getKbdClass('K')}>K</kbd>
              <div className="relative top-5">
                <kbd className={getKbdClass('L')}>L</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}