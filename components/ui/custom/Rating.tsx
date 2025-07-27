"use client";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface StarRatingProps {
  value?: number;
  max?: number;
  onChange?: (rating: number) => void;
  size?: number;
}

export function Rating({
  value,
  max = 5,
  onChange,
  size = 20,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [internalValue, setInternalValue] = useState(value);

  // Sync with props when value changes externally
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleClick = (rating: number) => {
    if (onChange) {
      setInternalValue(rating);
      onChange(rating); // optional callback
    }
  };

  const stars = Array.from({ length: max }).map((_, index) => {
    const isFilled =
      hovered !== null
        ? index < hovered
        : index < internalValue!;

    const icon = (
      <Star
        className={`transition ${
          isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
        style={{ width: size, height: size }}
      />
    );

    if (onChange) {
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index + 1)}
          onMouseEnter={() => setHovered(index + 1)}
          onMouseLeave={() => setHovered(null)}
          className="p-1"
        >
          {icon}
        </button>
      );
    }

    return <div key={index}>{icon}</div>;
  });

  return <div className="flex space-x-1">{stars}</div>;
}
