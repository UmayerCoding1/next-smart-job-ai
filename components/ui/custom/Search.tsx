"use client";
import React, { useState } from "react";

import { BriefcaseBusiness, Building2, SearchIcon, X } from "lucide-react";
import { seacrhSchema } from "@/lib/zod-schema/SearchForm";
import { useDispatch } from "react-redux";
import { setSearchData } from "@/app/features/searchSlice";
import PrimaryButton from "@/components/button/PrimaryButton";
import { useRouter } from "next/navigation";
import { Button } from "../button";

interface SearchProps {
  title?: string;
  jobType?: string;
  location?: string;
  clearSearch?: () => void;
}

const Search = ({ title, jobType, location ,clearSearch}: SearchProps = {}) => {
  
  const [search, setSearch] = useState({
    title: "",
    location: "",
    jobType: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const searchData = seacrhSchema.parse(search);
    console.log(search);
    dispatch(setSearchData(searchData));
    
    router.push(`/browse-jobs?title=${search.title}&location=${search.location}&jobType=${search.jobType}`);
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row gap-4 shadow-md p-5 border border-gray-300 rounded-lg">
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2">
        <BriefcaseBusiness size={15} className="text-gray-600" />
        <input
          type="search"
          name="title"
          defaultValue={ title || search.title}
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
          defaultValue={location || search.location}
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
           defaultValue={ jobType || search.jobType}
          onChange={handleChange}
          placeholder="Job Type (e.g. Full-time)"
          autoComplete="off"
          className="lg:w-72 h-12 outline-none text-sm font-medium"
        />
      </div>

      <PrimaryButton className="px-8" onClick={handleSubmit}>
        Search
      </PrimaryButton>

      {search.title || search.location || search.jobType ? (
         <Button onClick={clearSearch} variant={'destructive'} className="px-8"><X/></Button>
      ) :""}
    </div>
  );
};

export default Search;
