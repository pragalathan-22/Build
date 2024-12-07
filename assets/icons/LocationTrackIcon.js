import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

export default function LocationTrackIcon({ color, size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Outer circle representing the range */}
      <Circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth={2} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Inner pin representing the location */}
      <Path 
        d="M12 2c3.866 0 7 3.134 7 7 0 4.477-5.25 10.145-6.561 11.516a.5.5 0 01-.878 0C10.25 19.145 5 13.477 5 9c0-3.866 3.134-7 7-7z" 
        stroke={color} 
        strokeWidth={2} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Dot in the center */}
      <Circle cx="12" cy="9" r="1" fill={color} />
    </Svg>
  );
}