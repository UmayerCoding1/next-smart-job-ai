"use client";
import {
  clearFilterQuery,
  setDatePostedFilterQuery,
  setExperienceLavelFilterQuery,
  setJobTypeFilterQuery,
} from "@/app/features/filterSlice";
import { RootState } from "@/app/redux/store";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button";
import { Checkbox } from "../checkbox";

export const JobType = ["any", "full time", "hybrid", "remote", "internship"];
export const DatePosted = [
  "any",
  "last 24 hours",
  "last 7 days",
  "last 30 days",
];
export const ExperienceLavel = [
  "any",
  "internship",
  "entry level",
  "mid level",
  "senior level",
  "director",
  "executive",
];

const Filter = ({
  setFilterQuery,
}: {
  setFilterQuery: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const filterQuery = useSelector((state: RootState) => state.filterR);
  const [isOpenJobType, setIsOpenJobType] = useState<boolean>(true);
  const [jobType, setJobType] = React.useState<string[]>([]);
  const [isOpenExprience, setIsOpenExperience] = useState<boolean>(true);
  const [experience, setExperience] = React.useState<string[]>([]);
  const [isOpenDatePosted, setIsOpenDatePosted] = useState<boolean>(true);
  const [datePosted, setDatePosted] = React.useState<string>("");
  const [showResetButton, setShowResetButton] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleJobTypeChange = (checked: boolean, value: string) => {
    if (checked) {
      setJobType((prev) => [...prev,  value]);
    } else {
      setJobType((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleExperienceChange = (checked: boolean, value: string) => {
    if (checked) {
      setExperience((prev) => [...prev, value === 'any' ? '' : value === 'mid level' ? 'mid' : value === 'senior level' ? 'senior': value]);
    } else {
      setExperience((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleDatePostedChange = (checked: boolean, value: string) => {
    if (checked) {
      setDatePosted(value);
    }
  };

  useEffect(() => {
    dispatch(setJobTypeFilterQuery(jobType));
    dispatch(setExperienceLavelFilterQuery(experience));
    dispatch(setDatePostedFilterQuery(datePosted));

    if (
      filterQuery.DatePosted.length > 0 ||
      filterQuery.ExperienceLavel.length > 0 ||
      filterQuery.JobType.length > 0
    ) {
      setShowResetButton(true);
    }
  }, [jobType, experience, datePosted, filterQuery, dispatch]);

  const handleResetFilter = () => {
    setJobType([]);
    setExperience([]);
    setDatePosted("");
    setShowResetButton(false);
    dispatch(clearFilterQuery());
  };

  useEffect(() => {
    if (
      filterQuery.DatePosted.length > 0 ||
      filterQuery.ExperienceLavel.length > 0 ||
      filterQuery.JobType.length > 0
    ) {
      setShowResetButton(true);
    } else {
      setShowResetButton(false);
    }
  }, [filterQuery]);

  const filterString = JSON.stringify(filterQuery);
  useEffect(() => {
    setFilterQuery(filterString);
  }, [filterQuery]);

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-300 py-2">
        <h2 className="text-2xl font-semibold">All Filter</h2>

        {showResetButton && (
          <Button
            onClick={handleResetFilter}
            variant="destructive"
            className="cursor-pointer"
          >
            <RotateCcw />
            <span className="mr-2 ">Reset</span>
          </Button>
        )}
      </div>

      {/* Job Type */}
      <section>
        <div
          onClick={() => setIsOpenJobType(!isOpenJobType)}
          className="flex items-center justify-between border-b border-gray-300 py-2 hover:bg-blue-50 cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Job Type</h2>
          {isOpenJobType ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>

        <AnimatePresence>
          {isOpenJobType && (
            <motion.div
              key="jobTypeFilter"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              <div className="py-2">
                {JobType.map((type) => (
                  <div key={type} className="flex items-center gap-2 my-1">
                    <Checkbox
                      id={type}
                      checked={jobType.includes(type)}
                      onCheckedChange={(checked) =>
                        handleJobTypeChange(!!checked, type)
                      }
                      className="bg-transparent border border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-none"
                    />
                    <label htmlFor={type}>{type.toUpperCase()}</label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Experience */}
      <section>
        <div
          onClick={() => setIsOpenExperience(!isOpenExprience)}
          className="flex items-center justify-between border-b border-gray-300 py-2 hover:bg-blue-50 cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Experience Level</h2>
          {isOpenExprience ? (
            <ChevronUp size={15} />
          ) : (
            <ChevronDown size={15} />
          )}
        </div>

        <AnimatePresence>
          {isOpenExprience && (
            <motion.div
              key="jobTypeFilter"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              <div className="py-2">
                {ExperienceLavel.map((type) => (
                  <div key={type} className="flex items-center gap-2 my-1">
                    <Checkbox
                      id={type}
                      checked={experience.includes(type === 'any' ? '' : type === 'mid level' ? 'mid' : type === 'senior level' ? 'senior': type)}
                      onCheckedChange={(checked) =>
                        handleExperienceChange(!!checked, type === 'any' ? '' : type === 'mid level' ? 'mid' : type === 'senior level' ? 'senior': type)
                      }
                      className="bg-transparent border border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-none"
                    />
                    <label htmlFor={type}>{type.toUpperCase()}</label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Date Posted */}
      <section>
        <div
          onClick={() => setIsOpenDatePosted(!isOpenDatePosted)}
          className="flex items-center justify-between border-b border-gray-300 py-2 hover:bg-blue-50 cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Date Posted</h2>
          {isOpenDatePosted ? (
            <ChevronUp size={15} />
          ) : (
            <ChevronDown size={15} />
          )}
        </div>

        <AnimatePresence>
          {isOpenDatePosted && (
            <motion.div
              key="jobTypeFilter"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              <div className="py-2">
                {DatePosted.map((type) => (
                  <div key={type} className="flex items-center gap-2 my-1">
                    <Checkbox
                      id={type}
                      checked={datePosted.includes(type)}
                      onCheckedChange={(checked) =>
                        handleDatePostedChange(!!checked, type)
                      }
                      className="bg-transparent border border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-none"
                    />
                    <label htmlFor={type}>{type.toUpperCase()}</label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Filter;
