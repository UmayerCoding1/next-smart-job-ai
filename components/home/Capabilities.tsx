"use client";

import React from "react";
import { Button } from "../ui/button";
import { Brain, FileText, Zap } from "lucide-react";
import FadeRight from "../animations/FadeRight";
import FadeLeft from "../animations/FadeLeft";

const Capabilities = () => {
  return (
    <div className="mt-20 overflow-hidden">
      <section className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-semibold">Powered by Advanced AI</h1>
        <p className="text-sm text-gray-600">
          Three core features that revolutionize how you find and hire talent
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16 px-4">
        <FadeRight>
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 flex flex-col items-center gap-6 py-10 px-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(130,197,38,0.1)] transition-all duration-500 group h-full">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-[#82C526] transition-colors duration-500">
              <Brain className="w-8 h-8 text-[#5c940d] group-hover:text-white transition-colors duration-500" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-800 mb-3">AI Resume Analyzer</h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Upload your resume and our AI instantly extracts skills, experience, and qualifications. Get detailed insights and skill gap analysis.
              </p>
            </div>
          </div>
        </FadeRight>

        <div className="bg-white/80 backdrop-blur-xl border border-white/50 flex flex-col items-center gap-6 py-10 px-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(130,197,38,0.1)] transition-all duration-500 group h-full scale-105 z-10">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-[#82C526] transition-colors duration-500">
            <Zap className="w-8 h-8 text-[#5c940d] group-hover:text-white transition-colors duration-500" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-800 mb-3">Smart Job Matching</h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              Get personalized job recommendations with compatibility scores. Our AI matches your skills with job requirements for perfect opportunities.
            </p>
          </div>
        </div>

        <FadeLeft>
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 flex flex-col items-center gap-6 py-10 px-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(130,197,38,0.1)] transition-all duration-500 group h-full">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-[#82C526] transition-colors duration-500">
              <FileText className="w-8 h-8 text-[#5c940d] group-hover:text-white transition-colors duration-500" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-800 mb-3">Easy Applications</h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                One-click applications with AI-generated cover letters. Apply to multiple jobs instantly with personalized application materials.
              </p>
            </div>
          </div>
        </FadeLeft>
      </section>
    </div>
  );
};

export default Capabilities;
