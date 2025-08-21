'use client';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import React from 'react';

const MessageList = () => {
    return (
        <div>
           <div className='flex items-center justify-between'>
              <h1 className='text-lg font-medium'>Inbox</h1>

              <div className='flex items-center gap-2'>
             <h2 className=' font-medium'>Unreads</h2>
              <Switch id="airplane-mode" />
              </div>
           </div>

           <div className='p-2'>
            <Input placeholder='Type to search'/>
           </div>

           <div>
             {Array.from({ length: 30 }).map((_, index) => (
               <div
                 key={index}
                 className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer"
               >
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                   <div>
                     <p className="font-medium">John Doe</p>
                     <p className="text-gray-500 text-sm">Hello, how are you?</p>
                   </div>
                 </div>
                 <div>
                   <p className="text-gray-500 text-sm">2:30 PM</p>
                 </div>
               </div>
             ))}

            
           </div>
        </div>
    );
};

export default MessageList;