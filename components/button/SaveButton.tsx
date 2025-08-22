import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

const SaveButton = ({jobId, className,isOnlyIcon,defaultStyle=true}: {jobId: string, className?: string , isOnlyIcon?: boolean, defaultStyle?: boolean}) => {
    const [isSaveJobed, setIsSaveJobed] = useState(false);
    const getSaveJobs = () : string[] => {
        try {
            return JSON.parse(localStorage.getItem("savedJobs") || "[]");
        } catch  {
            return [];
        }
    }

    const setSavedJobs = (jobs: string[]) => {
  localStorage.setItem("savedJobs", JSON.stringify(jobs));
};
    const handleSvaeJob = async (jobId: string) => {
        const savedJobs = getSaveJobs();
       try {
        const response = await axios.post(`/api/save-job`, { jobId });
        if (response.data.success) {
            if(!savedJobs.includes(response.data.savedJobId)){
                savedJobs.push(response.data.savedJobId);
                console.log(savedJobs);
                setSavedJobs(savedJobs);
            }
            toast.success(response.data.message, { duration: 1500 });
        }
       } catch (error) {
           const err = error as AxiosError<{ message: string }>;
           
        
        const errorMessage =  error instanceof Error ? err.response?.data?.message : "An error occurred";
        toast.error( errorMessage , { duration: 1500 });
       }
    }


   
    return (
       <Button 
       variant={'ghost'} 
       className={`${className ? className : " w-full lg:w-40 "} ${defaultStyle && "border active:scale-105 h-12 bg-gray-100 shadow hover:bg-gray-200 cursor-pointer"}`}
       onClick={() => handleSvaeJob(jobId)}
       >
        <Bookmark className='fill-blue-500 text-transparent'/>
        {!isOnlyIcon && <span>Save</span>}
       </Button>
    );
};

export default SaveButton;