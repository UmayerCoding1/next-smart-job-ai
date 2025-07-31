"use client";

import { IJob } from "@/app/models/Job";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FilterQuery } from "mongoose";



const useJobs = (category?:  string, existingJodId?: string,title?: string ,jobType?: string,location?: string ,filterQuery?: string | null  ) => {
  
  const {
    data: jobs = [],
    isLoading,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ["jobs", category, existingJodId, title, location, jobType, filterQuery],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/jobs?category=${category}&existingJodId=${existingJodId}&title=${title}&location=${location}&jobType=${jobType}&filter=${filterQuery}`);

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
