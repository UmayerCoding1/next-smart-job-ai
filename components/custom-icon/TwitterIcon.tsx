import React from "react";

const TwitterIcon: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M14.215 10.585 21.513 2h-1.957l-6.262 7.264L8.275 2H2.5l7.622 11.078L2.5 22h1.957l6.625-7.682L15.725 22H21.5l-7.285-11.415Zm-2.346 2.72-.766-1.113L4.529 3.5H7.13l5.04 7.34.765 1.113 6.762 9.824h-2.6l-5.227-7.472Z"
      />
    </svg>
  );
};

export default TwitterIcon;
