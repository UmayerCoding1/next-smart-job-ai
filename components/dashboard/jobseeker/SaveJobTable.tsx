import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import React from "react";
import { IJob } from "./SavedJobsPage";


interface SaveJobTableProps  {
  storedJob: IJob[];
  getStatusColor: (status: string) => boolean;
  setOpenApplyModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const SaveJobTable = ({ storedJob, getStatusColor,setOpenApplyModal}: SaveJobTableProps) => {
  
  return (
    <>
      <Card className="overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b">
              <TableHead className="font-medium text-gray-700 py-4">
                JOB
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                DATE SAVED
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                STATUS
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storedJob.map((job: IJob) => (
              <TableRow key={job?._id} className="border-b hover:bg-gray-50">
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    {/* Company Logo */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {job?.company?.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 mb-1">
                        {job?.job?.title}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {job?.company?.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {job?.job?.jobtype
                            .map((jobtype: string) => jobtype)
                            .join(", ")}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {job?.job?.salaryrange?.min} -{" "}
                          {job?.job?.salaryrange?.max}{" "}
                        </span>
                        {/* <span className="text-xs text-gray-400">• Posted {job.}</span> */}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm text-gray-600">
                    {new Date(job?.createdAt).toLocaleString()}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    className={
                      getStatusColor(job.job.dedline)
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }
                  >
                    {getStatusColor(job.job.dedline) ? "Active" : "Expired"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusColor(job.job.dedline) && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setOpenApplyModal(true)}
                      >
                        Apply Now
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      // onClick={() => handleRemoveJob(job.job._id)}
                      className="text-gray-500 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default SaveJobTable;
