import React from 'react';
import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';

const SaveButton = ({jobId, className,isOnlyIcon,defaultStyle=true}: {jobId: string, className?: string , isOnlyIcon?: boolean, defaultStyle?: boolean}) => {
    const handleSvaeJob = (jobId: string) => {
         console.log(jobId);
    }
    return (
       <Button 
       variant={'ghost'} 
       className={`${className ? className : " w-full lg:w-40 "} ${defaultStyle && "border active:scale-105 h-12 bg-gray-100 shadow hover:bg-gray-200 cursor-pointer"}`}
       onClick={() => handleSvaeJob(jobId)}
       >
        <Bookmark className='fill-red-500'/>
        {!isOnlyIcon && <span>Save</span>}
       </Button>
    );
};

export default SaveButton;