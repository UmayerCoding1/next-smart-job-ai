import { updateApplicationCount } from "@/app/features/applicationCount";
import { RootState } from "@/app/redux/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    searchQuery: string;
    page: number;
    limit?: number
}

const useJobApplication = ({ searchQuery,page,limit }: Props) => {
  const user = useSelector((state: RootState) => state.authR.user);
  const dispatch = useDispatch();
const [paginationCounter, setPaginationCounter] = useState({totalApplications: 0,totalPages: 0,currentPage: 0});


  const { data: JobApplications = [], isLoading } = useQuery({
    queryKey: ["jobApplications", searchQuery, user?._id,page],
    queryFn: async () => {
      const res = await axios.get(
        `/api/recruiter/appications?search=${searchQuery}&page=${page}&limit=${limit || 10}`
      );
      console.log(res.data.paginationCount)
       setPaginationCounter(res.data.paginationCount);
      return res.data.applications;
    },
    enabled: !!user?._id,
  });

  
  useQuery({
    queryKey: ["applicationSummary", user?._id],
    queryFn: async () => {
      const res = await axios.get(
        `/api/recruiter/appications/summary`
      );
console.log('summary call')
      dispatch(updateApplicationCount(res.data.counts));
      return res.data.counts;
    },
    enabled: !!user?._id,
    staleTime: 10 * 60 * 1000, // 🔥 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
console.log(paginationCounter)
  return {
    JobApplications,
    paginationCounter,
    isLoading,
  };
};

export default useJobApplication;
