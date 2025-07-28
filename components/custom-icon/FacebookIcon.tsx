import React from "react";

const FacebookIcon: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <rect width="32" height="32" rx="6" fill="#1877F2" />
      <path
        d="M22 10.667h-2.667c-.368 0-.666.298-.666.666v2.001h3.333l-.444 3.333h-2.889V24h-3.334v-7.333h-2V13.667h2v-2c0-2.208 1.459-3.334 3.333-3.334H22v3.334Z"
        fill="white"
      />
    </svg>
  );
};

export default FacebookIcon;
