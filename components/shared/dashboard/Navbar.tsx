"use client";
import { toggle } from "@/app/redux/slice/DashboardSlice";
import { RootState } from "@/app/redux/store";
import {  PanelLeftOpen, PanelRightOpen } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const isOpen = useSelector((state: RootState) => state.dashboardR.isOpen);
  const dispatch = useDispatch();

  return (
    <div>
      {isOpen ? (
        <PanelRightOpen onClick={() => dispatch(toggle())} />
      ) : (
        <PanelLeftOpen onClick={() => dispatch(toggle())} />
      )}
    </div>
  );
};

export default Navbar;
