'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface FadeLeftProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeLeft({ children, className }: FadeLeftProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
