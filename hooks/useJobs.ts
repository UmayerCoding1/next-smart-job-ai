"use client";
import { IJob } from "@/app/models/Job";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



const useJobs = (category?:  string, existingJodId?: string) => {
   
  const {
    data: jobs = [],
    isLoading,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ["jobs", category],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/jobs?category=${category}&existingJodId=${existingJodId}`);

        return res.data.jobs;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });
  return { jobs, isLoading, refetchJobs };
};

export default useJobs;
