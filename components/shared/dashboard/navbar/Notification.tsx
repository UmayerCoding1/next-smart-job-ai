import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const UserImage = "/assets/user-image.png";
const Notificationa = () => {
    return (
        <div onClick={(e) => e.stopPropagation()} className='absolute top-8 right-0 w-[296px] z-10  bg-white shadow-lg border border-gray-200 rounded-lg p-2' >
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}  className="flex items-center gap-4 px-3 py-2 border-b ">
                          <div className="relative">
                            <Image
                              src={UserImage}
                              alt="user-image"
                              width={800}
                              height={800}
                              className="w-12 h-12 ovject-cover "
                            />
                           
                          </div>
            
                          <div className="leading-0.5">
                            <p className="text-lg font-semibold">Your apply is accepted</p>
                            <span className="text-sm font-medium text-gray-500">
                             {new Date().toDateString()}
                            </span>
                          </div>
                           <span className="block w-2 h-2 bg-blue-500 rounded-full absolute  right-2"></span>
                        </div>
            ))}

           <div  className='flex items-center justify-center '>
             <p className='text-sm font-semibold text-blue-400 underline cursor-pointer text-center my-4'>Show all notification</p>
             <ArrowRight size={13} className='text-blue-400'/>
           </div>
        </div>
    );
};

export default Notificationa;