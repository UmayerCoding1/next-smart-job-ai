"use client";

import React, { useState } from "react";
import PdfList from "./PdfList";
import { IResume } from "@/app/models/Resume";
import { CircleCheck, Loader2, PartyPopper } from "lucide-react";

const PreviesResume = ({resumes} : {resumes: IResume[] | []}) => {
  const [isUoloading, setUploading] = useState(true);
  const [isUpdating, setUpdating] = useState(false);
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
          <PdfList key={index} resume={resume} setUpdating={setUpdating} setUploading={setUploading}/>
        ))}
      </div>



       {isUpdating && <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/15 z-10 text-white">
          <div className={` ${isUoloading ? 'bg-white' : "bg-emerald-100"} text-black w-80 h-40 flex items-center justify-center rounded-lg relative `}>
            {isUoloading ? <div className={`flex items-center gap-2 `}>
              <Loader2 size={20} className="animate-spin"/>
              <span>Updating . . .</span>
            </div>
            :
           <div className="flex items-center flex-col gap-2">
             <CircleCheck size={50} className="text-emerald-500"/>
             <p className="text-sm text-emerald-500 font-medium">Updated Successfully </p>
             <PartyPopper className="text-emerald-500 absolute top-1 right-1 animate-ping"/>
           </div>
}
          </div>
       </div>}
    </div>
  );
};

export default PreviesResume;
