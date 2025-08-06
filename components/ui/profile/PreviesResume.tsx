"use client";

import React from "react";
import PdfList from "./PdfList";
import { IResume } from "@/app/models/Resume";

const PreviesResume = ({resumes} : {resumes: IResume[] | []}) => {
  console.log("resume", resumes);
  return (
    <div className="my-5 ">
      {/* <h3>previes resume (only avalable for premium user)</h3> */}

      <h2 className="text-xl font-semibold ">
        previes resume/CV{" "}
        <span className="text-sm text-gray-500">
          (only avalable last 3 files)
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {resumes.map((resume, index) => (
          <PdfList key={index} resume={resume} />
        ))}
      </div>
    </div>
  );
};

export default PreviesResume;
