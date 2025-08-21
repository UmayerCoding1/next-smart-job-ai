"use client";
import { Search } from "lucide-react";
import React from "react";

const InboxPage = () => {
  const messagees = [];
  return (
    <div className="w-full h-screen  flex border border-gray-300">
      {messagees.length > 0 ? (
        <div></div>
      ) : (
        <div className="flex flex-col items-center justify-center   w-full">
          <button  className='bg-gray-200 p-3 rounded-full'>
            <Search />
          </button>
          <div>
            <h2 className="text-center text-2xl font-medium">
              Select a message
            </h2>
            <p className="text-sm text-black/70">
              Choose a message from the list to view its contents
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxPage;
