import ApplyForm from '@/components/form/job/applyForm';
import { X } from 'lucide-react';
import React from 'react';


interface JobApplyModaleProps {
      setOpenApplyModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const JobApplyModale = ({setOpenApplyModal}: JobApplyModaleProps) => {
    return (
        <div>
            <h2 className='text-3xl  bg-white'>JobApplyModale</h2>

            <X className='cursor-pointer' onClick={()=>setOpenApplyModal(false)}/>
        </div>
    );
};

export default JobApplyModale;