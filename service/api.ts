import axios from "axios";

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
export const getJob = async (jobId: string) => {
  const res = await fetch(`/api/jobs/${jobId}`);
  const data = await res.json();
  console.log(data.job);

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


