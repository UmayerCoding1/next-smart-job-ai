import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Bookmark, Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const SaveButton = ({
  jobId,
  className,
  isOnlyIcon,
  defaultStyle = true,
}: {
  jobId: string;
  className?: string;
  isOnlyIcon?: boolean;
  defaultStyle?: boolean;
}) => {
  const [isSaveJobed, setIsSaveJobed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getSaveJobs = (): string[] => {
    try {
      return JSON.parse(localStorage.getItem("savedJobsId") || "[]");
    } catch {
      return [];
    }
  };

  const setSavedJobs = (jobsId: string[]) => {
    localStorage.setItem("savedJobsId", JSON.stringify(jobsId));
  };

  
  const handleSvaeJob = async (jobId: string) => {
    console.log(jobId);
    const savedJobs = getSaveJobs();
    try {
        setIsLoading(true);
      const response = await axios.post(`/api/save-job`, { jobId });
      if (response.data.success) {
        if (!savedJobs.includes(jobId)) {
          savedJobs.push(jobId);
          setSavedJobs(savedJobs);
          setIsSaveJobed(true);
          setIsLoading(false);
        }
        toast.success(response.data.message, { duration: 1500 });
      }
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ message: string }>;

      const errorMessage =
        error instanceof Error
          ? err.response?.data?.message
          : "An error occurred";
      toast.error(errorMessage, { duration: 1500 });
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleChackSavedJob = () => {
      const savedJobs = getSaveJobs();
      console.log(savedJobs, jobId);
      if (savedJobs.includes(jobId)) {
        setIsSaveJobed(true);
      }
    };
    handleChackSavedJob();
  }, [jobId]);

  const handleUnSaveJob = async (jobId: string) => {
    if (!jobId) return;
    try {
        setIsLoading(true); 
      const response = await axios.delete(`/api/save-job/${jobId}`);
      if (response.data.success) {
        setIsSaveJobed(false);
        setIsLoading(false);
        const savedJobs = getSaveJobs();
        savedJobs.splice(savedJobs.indexOf(jobId), 1);
        setSavedJobs(savedJobs);
        toast.success(response.data.message, { duration: 1500 });
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const errorMessage =
        error instanceof Error
          ? err.response?.data?.message
          : "An error occurred";
      toast.error(errorMessage, { duration: 1500 });
    }
  };

  return (
    <>
      {isSaveJobed ? (
        <Button
          variant={"ghost"}
          className={`${className ? className : " w-full lg:w-40 "} ${
            defaultStyle &&
            "border active:scale-105 h-12 bg-gray-100 shadow hover:bg-gray-200 cursor-pointer"
          }`}
          onClick={() => handleUnSaveJob(jobId)}
        >
         {isLoading ? <Loader2 className="animate-spin"/> : <>
          <Bookmark size={30} className="fill-blue-500 text-transparent " />
          {!isOnlyIcon && <span>Un Save</span>}
         </>}
        </Button>
      ) : (
        <Button
          variant={"ghost"}
          className={`${className ? className : " w-full lg:w-40 "} ${
            defaultStyle &&
            "border active:scale-105 h-12 bg-gray-100 shadow hover:bg-gray-200 cursor-pointer"
          }`}
          onClick={() => handleSvaeJob(jobId)}
        >
         {isLoading ? <Loader2 className="animate-spin"/> : <>
           <Bookmark  />
          {!isOnlyIcon && <span>Save</span>}
         </>}
        </Button>
      )}
    </>
  );
};

export default SaveButton;
