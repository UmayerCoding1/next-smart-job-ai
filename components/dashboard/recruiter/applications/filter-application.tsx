'use client';
import {

  Funnel,

} from "lucide-react";
import React, { useState } from "react";
import BulkAction from "./bulk-action";
import ApplicationControls from "./ApplicationControls";

const FilterApplication = () => {
    const [selectedApplicationsCount, setSelectedApplicationsCount] = useState(6);


  return (
    <div>
      <div className="flex items-center justify-between ">
        <h2 className="text-xl flex items-center gap-2">
          <Funnel size={15} />
          <p className="font-medium">Filter Application</p>
        </h2>

        <div className="flex items-center gap-3 ">
            {selectedApplicationsCount > 0 && (
                 <p className="text-xs bg-gray-200 px-2 py-0.5 rounded-md font-medium text-neutral-500">{selectedApplicationsCount} Selected</p>
            )}
         <BulkAction/>
        </div>
      </div>


      <div className="my-4 w-full ">
        <ApplicationControls/>
      </div>

    </div>
  );
};

export default FilterApplication;




