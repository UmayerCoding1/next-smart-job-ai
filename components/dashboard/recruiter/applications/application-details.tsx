import { Application } from "@/lib/mock-data";

import React from "react";

import { X } from "lucide-react";
import Details from "./details";
import Actions from "./application-Action";

interface Props {
  isOpenApplicationDetais: boolean;
  setIsOpenApplicationDetais: React.Dispatch<React.SetStateAction<boolean>>;
  applicationData: Application | null;
}

const ApplicationDetails = ({
  isOpenApplicationDetais,
  setIsOpenApplicationDetais,
  applicationData,
}: Props) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="max-w-7xl mx-auto max-h-[500px] overflow-hidden  bg-white rounded-md border border-neutral-300 flex p-4 relative "
    >
      <X
        className="absolute right-0 top-0 cursor-pointer"
        onClick={() => setIsOpenApplicationDetais(false)}
      />
      <Details appication={applicationData} />

      <div className="w-[300px] p-4 mt-10">
        <Actions application={applicationData} />
      </div>
    </div>
  );
};

export default ApplicationDetails;

