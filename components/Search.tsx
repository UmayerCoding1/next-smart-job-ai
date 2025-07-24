"use client";
import React, { useState } from "react";
import PrimaryButton from "./button/PrimaryButton";
import { BriefcaseBusiness, Building2, SearchIcon } from "lucide-react";
import { seacrhSchema } from "@/lib/zod-schema/SearchForm";
import { useDispatch } from "react-redux";
import { setSearchData } from "@/app/features/searchSlice";

interface SearchProps {
  onSearch?: (search: {
    jobTitle: string;
    location: string;
    jobType: string;
  }) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const searchData = seacrhSchema.parse(search);
    dispatch(setSearchData(searchData));

    if (onSearch) {
      onSearch(searchData);
    }
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row gap-4 shadow-md p-5 border border-gray-300 rounded-lg">
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2">
        <BriefcaseBusiness size={15} className="text-gray-600" />
        <input
          type="search"
          name="jobTitle"
          value={search.jobTitle}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Job title or keyword"
          className="lg:w-72 h-12 outline-none text-sm font-medium"
        />
      </div>
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2">
        <SearchIcon size={15} className="text-gray-600" />
        <input
          type="search"
          name="location"
          value={search.location}
          onChange={handleChange}
          placeholder="Location"
          autoComplete="off"
          className="lg:w-72 h-12 outline-none text-sm font-medium"
        />
      </div>
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2">
        <Building2 size={15} className="text-gray-600" />
        <input
          type="search"
          name="jobType"
          value={search.jobType}
          onChange={handleChange}
          placeholder="Job Type (e.g. Full-time)"
          autoComplete="off"
          className="lg:w-72 h-12 outline-none text-sm font-medium"
        />
      </div>

      <PrimaryButton className="px-8" onClick={handleSubmit}>
        Search
      </PrimaryButton>
    </div>
  );
};

export default Search;
