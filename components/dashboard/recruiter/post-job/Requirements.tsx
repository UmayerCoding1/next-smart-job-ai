"use client";
import { useState } from "react";
import { X, Plus } from "lucide-react";

interface RequirementsProps {
  name: string;
  value?: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style: 'row' | 'column';
}

const Requirements = ({ name, value = [], handleChange,style = 'column' }: RequirementsProps) => {
  const [requirements, setRequirements] = useState<string[]>(value);
  const [input, setInput] = useState("");

  const addRequirement = () => {
    if (input.trim() === "") return;
    const newReqs = [...requirements, input.trim()];
    setRequirements(newReqs);
    setInput("");
    
    // send change to parent
    handleChange({
      target: { name, value: JSON.stringify(newReqs) },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const removeRequirement = (index: number) => {
    const newReqs = requirements.filter((_, i) => i !== index);
    setRequirements(newReqs);
  
    handleChange({
      target: { name, value: JSON.stringify(newReqs) },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="w-full">
        

      {/* input with add button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a requirement and press +"
          className="w-full border rounded-md px-3 py-2"
        />
        <button
          type="button"
          onClick={addRequirement}
          className="border border-neutral-300 rounded-md p-2 cursor-pointer hover:bg-neutral-200 hover:border-neutral-200"
        >
          <Plus size={18} />
        </button>
      </div>

     
      <ul className={`mt-3 space-y-2  ${style === 'row' && "grid grid-cols-5 gap-2"}`}>
        {requirements.map((req, index) => (
          <li
            key={index}
            className={`flex justify-between items-center ${style === 'row' ? 'border border-neutral-300' : 'bg-gray-100'} px-3 py- rounded-md p-2 `}
          >
            <span>{req}</span>
            <button
              type="button"
              onClick={() => removeRequirement(index)}
              className="text-neutral-700 hover:text-red-700"
            >
              <X className="border border-neutral-300 rounded-full  w-6 h-6 cursor-pointer p-1 hover:bg-gray-200 hover:border-neutral-200" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requirements;
