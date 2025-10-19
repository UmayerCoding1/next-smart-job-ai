

import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {
    setShowApplications: React.Dispatch<React.SetStateAction<boolean>>;
    selectedJobAppilications: {
        id:string,
        title:string,
        totalAppications: number
    };
}

interface IApply {
    _id?: string;
      job: string;
      name: string;
      email: string;
      applicant: {
        _id: string;
        fullname: string;
        email: string;
        avatar: string;
        phone: string;
        status: string;
      };
      resumeLink: string;
      countryCode?: string;
      phone: string;
      status: string;
      appliedAt: Date;
      expectedSalary: number;
      coverLetter: string;
      jobRelatedQuestions?: {
        question: string;
        answer: string;
      }[];
      interviewDate?: Date;
      isRead?: boolean;
      createdAt?: Date;
      updatedAt?: Date;
}

const ViewAppication = ({setShowApplications, selectedJobAppilications}: Props) => {

    const {data:JobAppilications = [], isLoading} = useQuery({
        queryKey: ["JobAppilications", selectedJobAppilications.id],
        queryFn: async() => {
            const res = await axios.get(`/api/jobs/appications/${selectedJobAppilications.id}`);
            console.log(res.data.appications)
            return res.data.appications;
        }
    });


    console.log(JobAppilications);

    if(isLoading) return <div>Loading...</div>
    return (
        <div className="w-[600px]  bg-white px-5  pb-5 rounded-lg ">
        <div className='flex  justify-between py-4 mb-2 border-b border-neutral-300'>
            <div>
                <h1 className='text-xl font-semibold'>Applications for {selectedJobAppilications.title}</h1>
                <p className='text-neutral-500 text-sm font-medium'>{selectedJobAppilications.totalAppications} total applications</p>
            </div>
       
         <X onClick={() => setShowApplications(false)} className="cursor-pointer text-neutral-600" size={20}/>
        </div>

       <div className='max-h-[400px] overflow-auto scrollbar-hide mt-10'>
         {JobAppilications?.map((appication:IApply, index: number) => (
            <div key={index} className="w-full h-[110px] flex items-center justify-between border border-neutral-300 p-2 mb-2 rounded-lg relative">
                <div className='flex gap-2'>
                    <Image 
                    src={appication.applicant.avatar || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
                    alt='avatar'
                    width={100}
                    height={100}
                    className={`w-32 h-32 rounded-lg object-cover ${!appication.applicant.avatar && 'border border-neutral-300'}`}
                    />

                    <div>
                        <h2 className='text-lg font-bold'>{appication.name}</h2>
                        <p className='text-neutral-500 text-sm font-medium'>{appication.email}</p>
                        <p className='text-neutral-500 text-sm font-medium'>{appication.countryCode?.slice(0, 3)}{appication.phone}</p>

                        <p className='text-neutral-600 text-xs mt-5 font-medium '><span>Applied on</span> {new Date(appication.appliedAt).toLocaleDateString("en-US")}</p>
                        
                    </div>
                </div>

                <div className='flex flex-col items-end justify-between h-full'>
                    <div className='bg-emerald-400/30 px-4 py-1 text-neutral-700 flex items-center justify-center text-sm  font-medium rounded-full'>
                        {appication.status}
                    </div>
                    <Button>View Application</Button>
                    
                </div>

                <span className=' bg-blue-500 w-10 h-10 absolute top-0 left-0 rounded-full flex items-center justify-center text-sm text-white font-medium'>80%</span>
            </div>
         ))}
         
       </div>
      </div>
    );
};

export default ViewAppication;