import React from "react";

const LinkedInIcon: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <rect width="32" height="32" rx="6" fill="#0A66C2" />
      <path
        d="M12.16 22.667H9.333V13.333h2.827v9.334ZM10.747 12.12a1.64 1.64 0 1 1 0-3.28 1.64 1.64 0 0 1 0 3.28ZM22.667 22.667h-2.827v-4.547c0-1.248-.447-2.1-1.565-2.1-.854 0-1.362.576-1.587 1.133-.082.2-.102.478-.102.757v4.757h-2.827s.037-7.715 0-8.534h2.827v1.209c.375-.58 1.045-1.406 2.544-1.406 1.857 0 3.237 1.209 3.237 3.81v4.921Z"
        fill="white"
      />
    </svg>
  );
};

export default LinkedInIcon;
