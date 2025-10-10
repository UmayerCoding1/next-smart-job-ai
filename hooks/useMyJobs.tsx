import { RootState } from "@/app/redux/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const useMyJobs = ({ page, status }: { page: number; status: string }) => {
  const user = useSelector((state: RootState) => state.authR.user);

  const limit = 20;

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["allJobs", user?._id, page,  status],
    queryFn: async () => {
      const res = await axios.get(
        `/api/jobs/recruiter?recruiterId=${user?._id}&status=${status}&company=${user?.company?._id}&page=${page}&limit=${limit}`
      );

      console.log(res.data.jobs);
      return res.data.jobs;
    },
    staleTime: 5 * 60 * 1000, 

    enabled: !!user?._id,
  });
  return { jobs, isLoading };
};

export default useMyJobs;
