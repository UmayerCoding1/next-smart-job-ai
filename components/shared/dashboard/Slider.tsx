"use client";
import { ISliderData } from "@/lib/types";
import {
  ArrowDownToDot,
  ArrowUpFromDot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const Slider = ({ sliderData }: { sliderData: ISliderData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); 
      } else {
        setCardsPerView(3); 
      }
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentIndex + cardsPerView < sliderData.sliderItems.length) {
      setCurrentIndex((prev) => prev + cardsPerView);
    }
  };

  const handlePrev = () => {
    if (currentIndex - cardsPerView >= 0) {
      setCurrentIndex((prev) => prev - cardsPerView);
    }
  };

  const slideWidth = containerRef.current
    ? containerRef.current.offsetWidth
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 w-full">
        <motion.div
          className="w-10 h-10 rounded-full bg-blue-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="w-full relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Buttons */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="p-1 bg-white shadow text-gray-700 absolute z-10 top-1/2 left-0 transform -translate-y-1/2 rounded-full disabled:opacity-50 cursor-pointer"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={handleNext}
        disabled={currentIndex + cardsPerView >= sliderData.sliderItems.length}
        className="p-1 bg-white shadow absolute z-10 top-1/2 right-0 transform -translate-y-1/2 rounded-full disabled:opacity-50 cursor-pointer"
      >
        <ChevronRight />
      </button>

      {/* Slider */}
      <div
        ref={containerRef}
        className="overflow-hidden w-full overflow-x-auto scrollbar-hide"
      >
        <div
          className="flex gap-2 transition-transform duration-500 ease-in-out px-1"
          style={{
            transform: `translateX(-${
              (slideWidth / cardsPerView) * currentIndex
            }px)`,
          }}
        >
          {sliderData.sliderItems.map((card, index) => (
            <motion.div
              key={card.id}
              className={`h-32  flex-shrink-0 px-6 py-4 rounded-2xl shadow-lg border border-gray-100  hover:shadow-xl transition-shadow duration-300`}
              style={{
                width: `${100 / cardsPerView}%`,
                 backgroundColor: `${card.color}4D`
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                {/* Value + Trend */}
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-4xl font-bold text-gray-800">
                      <CountUp
                        end={card.value}
                        duration={1.5}
                        separator=","
                      />
                    </h2>
                    {card.trend === "up" ? (
                      <ArrowUpFromDot
                        size={18}
                        className="text-green-500 animate-bounce"
                      />
                    ) : (
                      <ArrowDownToDot
                        size={18}
                        className="text-red-500 animate-bounce"
                      />
                    )}
                  </div>
                  <p className="text-gray-600 text-lg font-medium mt-1">
                    {card.title}
                  </p>
                </div>

                {/* Floating Icons */}
                <div className="relative flex items-center justify-center">
  {[0, 1, 2].map((i) => (
    <motion.div
      key={i}
      className="absolute"
      style={{
        top: `${i * 24}px`, // spacing between icons
        right: `${i * 2}px`,
      }}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 40, opacity: [0, 1, 1.5, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: i * 0.4, // staggered drop effect
        ease: "easeInOut",
      }}
    >
      <card.icon
        size={28}
        style={{ color: card.color }}
        className={i % 2 === 0 ? "opacity-20 -rotate-45" : "opacity-10"}
      />
    </motion.div>
  ))}
</div>
              </div>
              <p className="text-sm text-gray-500 mt-3">{card.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Slider;
