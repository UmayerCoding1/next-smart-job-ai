'use client';

import React from 'react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion'; 

const MotionButton = motion(Button);

export interface GostButtonType {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const GostButton = ({ children , onClick,className}: GostButtonType) => {
  return (
    <MotionButton
    onClick={onClick}
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      variant="ghost"
      className={`bg-gray-100 flex items-center justify-center cursor-pointer ${className}`}
    >
      {children}
    </MotionButton>
  );
};

export default GostButton;
