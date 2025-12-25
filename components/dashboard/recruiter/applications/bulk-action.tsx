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
  Calendar,
  CircleCheck,
  CircleX,

  Trash2,
} from "lucide-react";
import { cn } from '@/lib/utils';

const BulkAction = () => {
      const bulkActionLable: { title: string; Icon: React.ElementType }[] = [
    {
      title: "Mark as Reviewed",
      Icon: CircleCheck,
    },
    {
      title: "Sehedule Interview",
      Icon: Calendar,
    },
    {
      title: "Reject all",
      Icon: CircleX,
    },
    {
      title: "Delete all",
      Icon: Trash2,
    },
  ];
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
                    className={`flex items-center gap-2  ${
                      item.title === "Reject all" &&
                      "text-red-500 hover:text-red-500"
                    } ${
                      item.title === "Delete all" &&
                      "text-red-500 hover:text-red-500"
                    }`}
                    key={index}
                  >
                    <item.Icon
                      className={cn(
                        item.title === "Reject all" ||
                          item.title === "Delete all"
                          ? "text-red-500"
                          : ""
                      )}
                    />
                    <span className="hover:text-red-500">{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    );
};

export default BulkAction;