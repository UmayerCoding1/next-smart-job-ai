"use client";


import { Briefcase, Search, CheckCircle2 } from "lucide-react";
import React from "react";
import {motion} from 'motion/react';


export const MotionDiv = motion.div;
const steps = [
  {
    icon: <Search className="h-8 w-8 text-white" />,
    title: "1. Discover Jobs",
    desc: "Explore a wide range of AI-matched job listings tailored to your skills and interests.",
    color: "bg-blue-500",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-white" />,
    title: "2. Apply with Ease",
    desc: "Use our AI-powered resume tools and one-click apply features to stand out.",
    color: "bg-purple-500",
  },
  {
    icon: <CheckCircle2 className="h-8 w-8 text-white" />,
    title: "3. Get Hired Faster",
    desc: "Track your application, chat with companies, and land your dream job in less time.",
    color: "bg-green-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-white text-gray-800" id="how-it-works">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How SmartJobAI Works</h2>
        <p className="text-base md:text-lg text-gray-600">
          We simplify the job hunt with intelligent automation. From discovery to hire – we’ve got you covered in 3 smart steps.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <MotionDiv
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className={`w-14 h-14 flex items-center justify-center rounded-full ${step.color} mb-4`}>
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
