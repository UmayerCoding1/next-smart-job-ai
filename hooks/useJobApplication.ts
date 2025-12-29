import { updateApplicationCount } from "@/app/features/applicationCount";
import { RootState } from "@/app/redux/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    searchQuery: string;
}

const useJobApplication = ({ searchQuery }: Props) => {
  const user = useSelector((state: RootState) => state.authR.user);
  const dispatch = useDispatch();

  // 🔹 1️⃣ Applications (can refetch many times)
  const { data: JobApplications = [], isLoading } = useQuery({
    queryKey: ["jobApplications", searchQuery, user?._id],
    queryFn: async () => {
      const res = await axios.get(
        `/api/recruiter/appications?search=${searchQuery}`
      );
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

  return {
    JobApplications,
    isLoading,
  };
};

export default useJobApplication;
