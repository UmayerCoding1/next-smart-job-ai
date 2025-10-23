import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Check, Ellipsis } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IJob } from '@/app/models/Job';
import { IDBDraftJobData } from '@/lib/types';
import { toast } from 'sonner';
const JobStatusChanger = ({status,job}: {status: string,job:IJob | IDBDraftJobData}) => {
      const dropdownItems = [
     'Active',
     'Closed',
     'Paused',
  ];

  const queryClient = useQueryClient();

  const {mutate: changeJobStatus,isPending} = useMutation({
    mutationFn : async (newStatus: string) => {
       await axios.patch(`/api/jobs/${job._id}/status`, { status: newStatus });
    },

      // Optimistic update
      onMutate: async (newStatus: string) => {
          await queryClient.cancelQueries({queryKey: ['job', job._id]});

          const previesJob = queryClient.getQueryData(['job', job._id]);
          queryClient.setQueryData<IJob>(['job', job._id], (oldData) => {
              if (!oldData) return previesJob as IJob;
              return {
                  ...oldData,
                  status: newStatus
              }
          })

          return { previesJob };

      },


    //   rollback error
    onError:(err,_,context) => {
        if(context?.previesJob){
              queryClient.setQueryData(['job', job._id], context.previesJob);
        }

        toast.error('"An error occurred while updating status', { duration: 1500 });
    },

     onSuccess: () => toast.success("Job status updated successfully"),

  onSettled: () => {
      // ✅ Refetch latest job data from server
      queryClient.invalidateQueries(['job', job?._id ||'']);
    },
  })
    return (
         <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="cursor-pointer" >
                  <Ellipsis/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
               
                <DropdownMenuGroup>
                   {dropdownItems?.map((item) => (
                     <DropdownMenuItem key={item}>
                       <p 
                        className={cn(
                          'w-full p-2 rounded-md text-sm font-semibold cursor-pointer flex items-center justify-between',
                          item === 'Deleted' && 'bg-red-500 text-white',
                          item.toLowerCase() === status && 'bg-green-500 text-white'
                        )}
                        onClick={() => changeJobStatus(item.toLowerCase())}
                       >{item} {item.toLowerCase() === status && <Check className="ml-2 text-white"/>}</p>
                     </DropdownMenuItem>
                   ))}
        
                   <DropdownMenuItem >
                       <p 
                        className={cn(
                          'w-full p-2 rounded-md text-sm font-semibold cursor-pointer flex items-center justify-between bg-red-500 text-white',
                         
                        )}
                        
                       >Delete</p>
                     </DropdownMenuItem>
                </DropdownMenuGroup>
                
              
              
              </DropdownMenuContent>
            </DropdownMenu>
    );
};

export default JobStatusChanger;