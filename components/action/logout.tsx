"use client";

import React from "react";

interface LogoutProps {
    children: React.ReactNode;
    handleLogout: () => void;

}

const Logout = ({ children,  handleLogout}: LogoutProps) => {
  
   
  return <button onClick={() => handleLogout()} className="cursor-pointer w-full h-full">{children}</button>;
};

export default Logout;
