
'use client';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useGetSaveJobs = (userId: string,page?: number, limit?: number, search?: string) => {
    const {data: savedJobs = [], isLoading} = useQuery({
        queryKey: ['savedJobs', userId, page, limit, search],
        queryFn: async () => {
            const response =await axios.get(`/api/save-job/${userId}?page=${page}&limit=${limit}&search=${search}`);
            return response.data;

        }
    });


    return {savedJobs: savedJobs?.savedJobs, pagination : savedJobs?.pagination,  isLoading};
} 

export default useGetSaveJobs