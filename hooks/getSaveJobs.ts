
'use client';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useGetSaveJobs = (userId: string,page?: number, limit?: number) => {
    const {data: savedJobs = [], isLoading, refetch} = useQuery({
        queryKey: ['savedJobs', userId, page, limit],
        queryFn: async () => {
            const response =await axios.get(`/api/save-job/${userId}?page=${page}&limit=${limit}`);
            return response.data;

        }
    });


    return {savedJobs: savedJobs?.savedJobs, pagination : savedJobs?.pagination,  isLoading,refetch};
} 

export default useGetSaveJobs