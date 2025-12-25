import { updateApplicationCount } from "@/app/features/applicationCount";
import { RootState } from "@/app/redux/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


type Props = {
    searchQuery: string;

    
}



const useJobApplication = ({searchQuery}:Props ) => {
    const user = useSelector((state:RootState) => state.authR.user);
    const dispatch = useDispatch();
    const {data: JobApplications = [],isLoading} = useQuery({
        queryKey: ['jobApplications', searchQuery, user?._id],
        queryFn: async () => {
            const res = await axios.get(`/api/recruiter/appications?serch=${searchQuery}`);
            console.log(res.data)
            
            dispatch(updateApplicationCount(res.data.counts));
            return res.data.applications;
        },
        // enabled:  !!user?._id,
        staleTime: 5 * 60 * 1000 
    })
    return{
        JobApplications,
        isLoading
    }
};

export default useJobApplication;