"use client";

import React from "react";

import Hero from "./Hero";
import Jobs from "./Jobs";
import Capabilities from "./Capabilities";
import Categorys from "./Categorys";
import Company from "./Company";
import About from "./About";
import KeyHighlights from "./KeyHighlights";
import Testimonials from "./Testimonials";
import FQA from "./FQA";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <div className="flex flex-col gap-10">
      <Hero />

      <div className="lg:max-w-7xl lg:mx-auto p-2 lg:p-0">
        <Jobs />
        <About />
        <Capabilities />
        <KeyHighlights />
        <Categorys />
        <Testimonials />
        <Company />
        <FQA />
        <HowItWorks />
      </div>
    </div>
  );
};

export default Home;
