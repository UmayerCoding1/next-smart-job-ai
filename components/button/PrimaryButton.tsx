import React from "react";
import { Button } from "../ui/button";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  Icon?: React.ElementType;
  iconSize?: number;
  iconPosition?: "left" | "right";
  className?: string;
}

const PrimaryButton = ({
  children,
  Icon,
  className,
  iconSize,
  iconPosition,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Button
      className={`bg-gradient-to-r from-blue-500 hover:form-blue-700 to-blue-700 hover:to-blue-900 text-white py-6 cursor-pointer flex items-center gap-2 ${
        className ?? ``
      }`}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon size={iconSize}/>}
      <span className="font-semibold">{children}</span>
      {Icon && iconPosition === "right" && <Icon size={iconSize}/>}
    </Button>
  );
};

export default PrimaryButton;
