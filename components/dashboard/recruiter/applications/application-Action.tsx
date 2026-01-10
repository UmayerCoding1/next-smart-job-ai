"use client";
import Heading from "@/components/heading";
import Hr from "@/components/hr-tag";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Application } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Bookmark, Calendar as CalendarIcon, Send, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  application: Application | null;
}

const Actions = ({ application }: Props) => {
  const [statusValue, setStatusValue] = useState(application?.status);
  const [openInterviewModal, setOpenInterviewModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    application?.interviewDate ? new Date(application.interviewDate) : undefined
  );
  const [existingInterviewDate, setExistingInterviewDate] = useState<Date | null>(null);

  const handleApplicationAtatusUpdate = async (value: string) => {
    try {
      setStatusValue(value);

      const ressponse = await axios.patch(
        `/api/recruiter/appications/${application?._id}/status`,
        { status: value }
      );

      if (ressponse.data.success)
        toast.success(ressponse.data.message, { duration: 1500 });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred", { duration: 1500 });
    }
  };


  useEffect(()=>{
    const locanSaveInterviewDate = localStorage.getItem("interviewDate");

    if(locanSaveInterviewDate){
      const datesArray: { id: string; date: string | null }[] = locanSaveInterviewDate
      ? JSON.parse(locanSaveInterviewDate)
      : [];

      const existingItem = datesArray.find((item) => item.id === application?._id);
      if(existingItem){
        setExistingInterviewDate(existingItem.date ? new Date(existingItem.date) : null);
      }
    }
  },[ application?._id]);


  const handleSendMessage = () => {
    try {
      toast.success("Message sent successfully", { duration: 1500 });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" bg-neutral-100  py-5 px-3 rounded-md">
      <Heading>Action</Heading>
      <Hr className="mb-2 mt-1" />
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1 ">
          <Label className="text-sm font-medium">Update Status</Label>
          <Select
            value={statusValue}
            onValueChange={(value) => handleApplicationAtatusUpdate(value)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Shedule Interview</Label>

          <div
            onClick={() => setOpenInterviewModal(true)}
            className="border border-neutral-300 bg-white rounded-md  px-4  py-2 flex items-center gap-2 cursor-pointer hover:bg-neutral-200 "
          >
            <CalendarIcon size={13} />
            <Label className="text-sm font-medium cursor-pointer">
              { selectedDate ? (
                <span> {dateFormate(selectedDate || new Date())}</span>
              ) : existingInterviewDate ?  dateFormate(existingInterviewDate)  : (
                "Pick a date"
              )}
            </Label>
            {openInterviewModal && (
              <InterviewModal
                application={application}
                setOpenInterviewModal={setOpenInterviewModal}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="mt-4 w-full  flex items-center gap-2 justify-between p-4">
        <Button onClick={() => handleSendMessage()} className="flex-1 bg-blue-500 hover:bg-blue-600">
          <Send />
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default Actions;

interface InterviewModalPeops {
  application: Application | null;
  className?: string;
  setOpenInterviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const InterviewModal = ({
  className,
  application,
  setOpenInterviewModal,
  selectedDate,
  setSelectedDate,
}: InterviewModalPeops) => {
  const [time, setTime] = useState(getCurrentTime());

  const saveInterviewDateInLocal = (date: Date | undefined, id: string) => {
    const previousDates = localStorage.getItem("interviewDate");

    const datesArray: { id: string; date: string | null }[] = previousDates
      ? JSON.parse(previousDates)
      : [];

    const existingIndex = datesArray.findIndex((item) => item.id === id);

    if (existingIndex !== -1) {
      // update
      datesArray[existingIndex].date = date ? date.toISOString() : null;
    } else {
      // insert
      datesArray.push({
        id,
        date: date ? date.toISOString() : null,
      });
    }

    localStorage.setItem("interviewDate", JSON.stringify(datesArray));
    setOpenInterviewModal(false);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setOpenInterviewModal(false);
      }}
      className={cn(
        "fixed top-0 left-0 w-full h-screen z-10 bg-black/50 flex items-center justify-center",
        className
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]  border bg-background p-6 shadow-lg  rounded-md cursor-auto"
      >
        <X
          onClick={() => setOpenInterviewModal(false)}
          className="absolute right-1 top-1 cursor-pointer text-neutral-500"
          size={13}
        />
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Schedule Interview
          </h2>
          <p className="text-md text-neutral-500">
            Schedule an interview with{" "}
            <span className="text-black font-medium">{application?.name}</span>{" "}
            for the{" "}
            <span className="text-black font-medium">
              {application?.job.title}
            </span>{" "}
            position.
          </p>
        </div>

        <div className="flex items-center justify-center p-10">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-lg border [--cell-size:--spacing(10)] md:[--cell-size:--spacing(10)]"
            buttonVariant="ghost"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Interview Time
          </h2>

          <div>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full"
            />
          </div>

          {selectedDate && (
            <p className="text-center text-md my-5 text-neutral-500">
              Scheduled for:{" "}
              <span className="text-black  font-medium tracking-tight">
                {" "}
                {dateFormate(selectedDate || new Date())} at {time}
              </span>
            </p>
          )}

          <div className="w-full flex items-center justify-end mt-5 gap-2 ">
            <Button
              onClick={() => setOpenInterviewModal(false)}
              size={"lg"}
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                saveInterviewDateInLocal(selectedDate, application?._id || "")
              }
              size={"lg"}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getCurrentTime = () => {
  const time24 = new Date().toLocaleTimeString("en-GB");
  return time24;
};

const dateFormate = (date: Date | string) => {
  const newDate = new Date(date);

  const formattedDate = newDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};
