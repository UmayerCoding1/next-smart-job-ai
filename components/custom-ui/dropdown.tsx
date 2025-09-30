"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type CustomDropdownProps = {
  name: string;
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  name,
  value,
  options,
  placeholder = "Select an option",
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (val: string) => {
    onChange({
      target: {
        name,
        value: val,
      },
    } as React.ChangeEvent<HTMLInputElement>);
    setOpen(false);
  };

  return (
    <div className={cn(`relative w-full`, className)}>
      {/* Trigger */}
      <div
        className="w-full border rounded-md px-3 py-2 flex justify-between items-center cursor-pointer bg-white shadow-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-sm text-neutral-500">
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform animate-bounce ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      
      {open && (
        <ul className="absolute left-0 mt-1 w-full bg-white border max- rounded-md shadow-lg  z-50">
          {options.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className={`px-3 py-1.5 cursor-pointer text-sm hover:bg-gray-100 ${
                value === item ? "bg-gray-100 " : ""
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
