import { ISalary } from "@/app/models/Job";
import React from "react";

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
     
  }