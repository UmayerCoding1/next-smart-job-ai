'use client';
import { RootState } from '@/app/redux/store';
import { Button } from '@/components/ui/button';
import { Bot, BotMessageSquare } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Overview = () => {
    const user = useSelector((state: RootState) => state.authR.user);
      const [greeting, setGreeting] = useState<string>("");
      const now = new Date();
      const hours = now.getHours();
    
      useEffect(() => {
        const timeGreeting = () => {
          if (hours >= 4 && hours < 12) {
            setGreeting("Good Morning");
          } else if (hours >= 12 && hours < 16) {
            setGreeting("Good Afternoon");
          } else if (hours >= 16 && hours < 20) {
            setGreeting("Good Evening");
          } else {
            setGreeting("Good Night");
          }
        };
    
        timeGreeting();
      }, [hours]);
    return (
        <div>
              <div className="w-full h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg p-4 text-white relative">
          <h2 className="text-2xl font-medium">
            {greeting}, {user?.fullname}
          </h2>

          <div className="mt-5">
            <div className="flex items-center gap-2">
              <Bot />
              <h2 className="text-2xl font-semibold">AI Career Assistant</h2>
            </div>
              <p className="text-sm text-white/80">
                Your AI has analyzed 1,247 jobs and found 8 perfect matches.
                Ready to accelerate your career?
              </p>

              <Button variant={"ghost"} className={" border active:scale-105 mt-2"}>
                <BotMessageSquare/>
                <span>Chat with AI</span>
              </Button>
          </div>

          <div className="w-40 h-40 bg-white/10 absolute -top-20 -right-[65px] rounded-full"></div>
        </div>
        </div>
    );
};

export default Overview;