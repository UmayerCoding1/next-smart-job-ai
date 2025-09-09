import { IJob } from "@/app/models/Job";
import axios from "axios";
import { string } from "zod";

export const getAllJobs = async (
  category?: string,
  existingJodId?: string,
  title?: string,
  jobType?: string,
  location?: string,
  filter?: string
) => {
  try {
    const res = await axios.get(
      `/api/jobs?category=${category}&existingJodId=${existingJodId}&title=${title}&location=${location}&jobType=${jobType}&filter=${filter}`
    );

    return res.data.jobs;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const jobCache: Record<string, IJob> = {};
export const getJob = async (jobId: string) => {
  console.log("api jobId", jobId);
  console.log("api jobCache", jobCache);
  if (jobCache[jobId]) return jobCache[jobId];
  const res = await fetch(`/api/jobs/${jobId}`);

  const data = await res.json();

  jobCache[jobId] = data.job;

  return data.job;
};

export const getUserByUsername = async (username: string) => {
  try {
    const res = await axios.get(`/api/auth/${username}`);
    return res.data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCompany = async (id: string) => {
  try {
    const res = await axios.get(`/api/company/${id}`);
    return res.data.company;
  } catch (error) {
    console.log(error);
    return null;
  }
};
