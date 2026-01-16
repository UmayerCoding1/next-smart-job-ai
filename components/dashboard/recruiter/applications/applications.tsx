"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ApplicationSummary from "./applicatiom-summary";
import { Container } from "@/components/shared/container";
import Application from "./application";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Applications = () => {
  return (
    <div className="">
      <ApplicationHeader />
      <Container className="max-w-[1100px]">
        <ApplicationSummary />

        <Application />
      </Container>
    </div>
  );
};

export default Applications;

export const ApplicationHeader = ({ className }: { className?: string }) => {
  const [format, setFormat] = useState('pdf');
  const [status, toggleStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleExportData = async () => {
   try {
    setIsLoading(true);
    const ressponse = await axios.get(`/api/recruiter/appications/export?format=${format}&applicationStatus=${status}`);
    console.log(ressponse.data)
    
    if (ressponse.data.success) {
      toast.success(ressponse.data.message, { duration: 1500 });
      setIsLoading(false);
    }else{
      toast.error(ressponse.data.message, { duration: 1500 });
      setIsLoading(false);
    }
   } catch (error) {
    console.log(error);
    toast.error("An error occurred", { duration: 1500 });
   }finally{
    setIsLoading(false);
   }
  };
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-neutral-300 px-4 pb-2",
        className
      )}
    >
      <div>
        <h2 className="text-3xl font-semibold tracking-tighter">
          Applications
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Manage and review all job applications
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button size="sm">Export Data</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Export Applications
                </DialogTitle>
                <DialogDescription>
                  {" "}
                  Download job application data based on selected filters
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                  </select>
                </div>
                <div className="grid gap-3">
                  <div className="flex gap-2 flex-wrap">
                    {["new", "reviewed", "interview", "rejected"].map((s) => (
                      <label className="flex gap-1  items-center" key={s}>
                        <input
                          type="checkbox"
                          checked={status.includes(s)}
                          onChange={() => toggleStatus(s)}
                        />{" "}
                        <p className="font-medium tracking-tight">{s}</p>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={() => handleExportData()}>
                  {isLoading ? <Loader2 className="animate-spin"/> : "Export"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
};
