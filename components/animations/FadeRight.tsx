"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface FadeRightProps {
  children: React.ReactNode;
  className?: string; // optional if you want animation div to be styled
}

function FadeRight({ children, className }: FadeRightProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default FadeRight;
