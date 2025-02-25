import React from 'react';

export default function InteractiveOcarina() {
  /* Center the parent container */
  return (
    <div className="flex justify-center items-center h-screen">
    {/* Center the content and use text-center for centering text */}
      <div className="relative inline-block text-center">
         {/* Center the image container and add margin-bottom */}
        <div className="w-1/2 mx-auto mb-4">
        {/* Ensure the image scales correctly */}
          <img src="/assets/ocarina.png" className="block w-full h-auto rotate-35" />
        </div>
        {/* Use flex to position the kbd containers next to each other */}
        <div className="relative z-40 flex justify-center">

           {/* WASD container */}
          <div className="relative flex flex-col items-center mr-20">
            <div className="mb-2">
              <kbd className="kbd kbd-xl">W</kbd>
            </div>
            <div className="flex justify-center gap-12 mb-2">
              <kbd className="kbd kbd-xl">A</kbd>
              <kbd className="kbd kbd-xl">D</kbd>
            </div>
            <div className="mb-2">
              <kbd className="kbd kbd-xl">S</kbd>
            </div>
          </div>

          {/* HJK container */}
          <div className="relative flex flex-col items-center">
            <div className="flex justify-center space-x-2 mt-10">
              <kbd className="kbd kbd-xl">H</kbd>
              <div className="relative top-5">
              <kbd className="kbd kbd-xl">J</kbd>
              </div>
              <kbd className="kbd kbd-xl">K</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}