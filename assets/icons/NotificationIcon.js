import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

export default function NotificationIcon({ color, size, hasNotification }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Bell Shape (Common for both with and without notification) */}
      <Path
        d="M12 2C8.69 2 6 4.69 6 8V14C6 14.53 5.79 15.03 5.44 15.3L4.39 16.29C4.14 16.58 4 16.95 4 17.33C4 18.1 4.9 19 5.67 19H18.33C19.1 19 20 18.1 20 17.33C20 16.95 19.86 16.58 19.61 16.29L18.56 15.3C18.21 15.03 18 14.53 18 14V8C18 4.69 15.31 2 12 2ZM12 16C10.35 16 9 14.65 9 13C9 11.35 10.35 10 12 10C13.65 10 15 11.35 15 13C15 14.65 13.65 16 12 16ZM14 18H10C9.45 18 9 17.55 9 17C9 16.45 9.45 16 10 16H14C14.55 16 15 16.45 15 17C15 17.55 14.55 18 14 18Z"
        fill={color}
      />

      {/* If there's a notification, add a small dot */}
      {hasNotification && (
        <Circle cx="17" cy="7" r="3" fill={color} />
      )}
    </Svg>
  );
}
