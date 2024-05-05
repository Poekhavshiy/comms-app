"use client";

import React, { useState, Fragment } from 'react';
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';

// Define your component that includes the color wheel
function ColorWheel() {
  // State to manage the color
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

  return (
    <Fragment>
      {/* Color Wheel component */}
      <Wheel 
        color={hsva} 
        onChange={(color) => setHsva({ ...hsva, ...color.hsva })} 
        style={{ width: '200px', height: '200px' }} // Set the size of the color wheel
      />

    </Fragment>
  );
}

// Export your component
export default ColorWheel;
