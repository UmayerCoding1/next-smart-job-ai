import React from "react";

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="instaGradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="50%" stopColor="#dd2a7b" />
          <stop offset="100%" stopColor="#515bd4" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="15%" fill="url(#instaGradient)" />
      <path
        d="M349.33 128H162.67C141.33 128 128 141.33 128 162.67v186.66C128 370.67 141.33 384 162.67 384h186.66C370.67 384 384 370.67 384 349.33V162.67C384 141.33 370.67 128 349.33 128zM256 330.67c-41.17 0-74.67-33.5-74.67-74.67S214.83 181.33 256 181.33 330.67 214.83 330.67 256 297.17 330.67 256 330.67zm85.33-149.34a21.34 21.34 0 1 1 0-42.66 21.34 21.34 0 0 1 0 42.66z"
        fill="#fff"
      />
      <circle cx="256" cy="256" r="57.6" fill="#fff" />
    </svg>
  );
};

export default InstagramIcon;
