'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleCheck,
  CircleX,

  Trash2,
} from "lucide-react";
import { toast } from 'sonner';
import axios from 'axios';

type BulkActionType = 'read' | 'reject' | 'delete';

const BulkAction = () => {
      const bulkActionLable: { title: string; Icon: React.ElementType,action: BulkActionType }[] = [
    {
      title: "Mark as Reviewed",
      Icon: CircleCheck,
      action:'read'
    },
    {
      title: "Reject all",
      Icon: CircleX,
      action:'reject'
    },
    {
      title: "Delete all",
      Icon: Trash2,
      action:'delete'
    },
  ];



  const helperFunction = async(action: BulkActionType) => {
  if (action === 'read') return await applicationsMarkAsReviewed();
  if (action === 'reject') return await applicationsReject();
  if (action === 'delete') return await applicationsDelete();
};



  const applicationsMarkAsReviewed = async () =>{
    try {
      const response =await axios.put('/api/recruiter/appications/reviewed');
      if(response.data.success) toast.success(response.data.message, { duration: 1500 });
    } catch (error) {
      console.log(error)
      toast.error("An error occurred", { duration: 1500 });
    }
  };


  const applicationsReject =async () =>{
   try {
      const response =await axios.put('/api/recruiter/appications/reject');
      if(response.data.success) toast.success(response.data.message, { duration: 1500 });
    } catch (error) {
      console.log(error)
      toast.error("An error occurred", { duration: 1500 });
    }
  };
  const applicationsDelete = () =>{
    toast.info("This feature is not available yet", { duration: 1500 });
  };


    return (
        <div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="default"
                aria-label="More Options"
              >
                Bulk Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                {bulkActionLable.map((item, index) => (
                  <DropdownMenuItem
                    onClick={() => helperFunction(item.action )}
                    className={`flex items-center gap-2 `}
                    key={index}
                  >
                    <item.Icon/>
                    <span >{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    );
};

export default BulkAction;