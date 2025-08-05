import ResumeUpload, { ResumeUploadInput } from '@/components/shared/FileUpload';
import { CloudDownload } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import PreviesResume from './PreviesResume';
import { Button } from '../button';
import { toast } from 'sonner';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';



const Resume = () => {
const user = useSelector((state: RootState) => state.authR.user)
    const [resumedata, setResumeData] = useState<{
        url: string;
        name: string;
        file: File | null;
      } | null>(null);


      const handleFileChange = (pdfdata: {
        url: string;
        name: string;
        file: File;
      }) => {
        if(pdfdata){
          setResumeData(pdfdata);
          toast.success("Resume uploaded successfully", { duration: 1500 });
        }else{
          toast.error("Something went wrong", { duration: 1500 });
          setResumeData(null);
        }
      };


      console.log(user)
    return (
        <ResumeUpload handleGetFileData={handleFileChange }>
                <div className="w-full ">
                  <div className="flex gap-5 ">
                    <div className={`{ ${resumedata?.url ? 'lg:w-[55%]' : 'w-full lg:w-full'} cursor-pointer `}>
                      <ResumeUploadInput
                        handleFileInput={{ id: "resume", className: "w-full" }}
                      />
                      <label htmlFor="resume">
                        <div className="w-full  h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                          <CloudDownload size={20} className="rotate-180" />
                          <span className="text-lg font-semibold">
                            Upload Your Resume
                          </span>
                          <span className="text-sm">Upload only document</span>
                        </div>
                      </label>
                    </div>
                    {resumedata?.url && (
                      <div className="h-40 shadow p-2">
                      <Link
                        href={resumedata?.url 
                          ? resumedata.url : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 h-full"
                      >
                        <div className="w-40 h-full bg-red-700 rounded-lg flex items-center justify-center ">
                          <span className="text-white text-xl">PDF</span>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <span className="text-sm">{resumedata.name}</span>
                          
                        </div>
                      </Link>
                    </div>
                    )}
                  </div>
                </div>

               <PreviesResume/>
                <Button className="bg-gradient-to-tr from-blue-500 to-blue-800 w-full">
                  Update
                </Button>
              </ResumeUpload>
    );
};

export default Resume;