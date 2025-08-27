"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft,  RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const rounte = useRouter();
  const handleReset = () => {
    setIsLoading(true);
    setTimeout(() => {
      reset();
    }, 500);
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center space-y-4">
      <h2 className="text-2xl font-semibold text-red-600">
        Something went wrong!
      </h2>
      <p className="text-gray-500">{error.message}</p>

      <div className="flex gap-4">
        <Button
          onClick={() => {
            rounte.back();
          }}
          className="px-4 py-2 bg-black text-white rounded hover:bg-black-70 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <MoveLeft  />
          Back
        </Button>
        <Button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <RotateCcw className={` ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? <>Trying...</> : "Try Again"}
        </Button>
      </div>
    </div>
  );
}
