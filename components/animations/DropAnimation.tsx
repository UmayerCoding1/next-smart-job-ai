'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

interface DropAnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const DropAnimation: React.FC<DropAnimationProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: -50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay,
      }}
      // Keeps layout intact
    >
      {children}
    </motion.div>
  );
};

export default DropAnimation;
