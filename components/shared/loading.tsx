import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const Loading = ({
  className,
  size = 33,
  color = 'black'
}: {
  className?: string;
  size?: string | number;
  color?: 'black' | 'white';
}) => {
    const loderColor = `text-${color}`
  return (
    <div>
      <Loader2 className={cn(className, "animate-spin ", loderColor )} size={size} />
    </div>
  );
};

export default Loading;
