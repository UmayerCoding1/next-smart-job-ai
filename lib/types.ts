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