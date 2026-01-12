import { ISalary } from "@/app/models/Job";
import React from "react";
import { Application } from "./mock-data";
import { SendMessageForApplicant } from "@/app/models/SendMessage";

export interface ISliderData {
    totalCards: number;
    sliderItems: ISliderItem[];
  }
  
  export interface ISliderItem {
    id: number;
    title: string;
    value: number;
    subtitle: string;
    icon: React.ElementType;
    color: string;
    trend: "up" | "down" | "neutral";
  }


  export interface iDBUserData {
     iid: string;
     id: string;
     name: string;
     email: string;
     password: string;
     createdAt: number
  }


  export interface IDBDraftJobData {
     _id?: string;
      title: string;
      description: string;
      company: string;
      recruiter: string;
      location: string;
      salaryrange?: ISalary;
      jobtype: string[];
      skills: string[];
      education?: string[];
      experience: string[];
      experienceLevel: string;
      dedline: string;
      category: string;
      holidayPolicy?: string;
      workTime: {
        start: string;
        end: string;
      };
      requirements: string[];
      shift: string;
      benefits: string[];
      vacancies: number;
      isRemoteAvailable: boolean;
      
      applicationsQuestions: [];
      status: string;
     

      //

      appliedjobs?: string[];
      savedjobs?: string[];
  }



 export interface InterviewModalPeops {
    application: Application | null;
    className?: string;
    setOpenInterviewModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDate: Date | undefined;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    time: string;
    setTime: React.Dispatch<React.SetStateAction<string>>;
    mode: 'Offline' | 'Online';
    setMode: React.Dispatch<React.SetStateAction<'Offline' | 'Online'>>;
    meetingLink: string;
    setMeetingLink: React.Dispatch<React.SetStateAction<string>>;
  }


