"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";



const useJobs = (category?:  string, existingJodId?: string,title?: string ,jobType?: string,location?: string   ) => {
   
  const {
    data: jobs = [],
    isLoading,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ["jobs", category, existingJodId, title, location, jobType],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/jobs?category=${category}&existingJodId=${existingJodId}&title=${title}&location=${location}&jobType=${jobType}`);

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
