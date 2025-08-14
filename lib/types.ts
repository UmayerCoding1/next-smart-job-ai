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
    iconColor: string;
    trend: "up" | "down" | "neutral";
  }