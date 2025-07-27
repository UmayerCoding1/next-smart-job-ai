import axios from "axios";


export const getJob = async (jobId: string) => {
  const res = await fetch(`/api/jobs/${jobId}`);
  const data = await res.json();
  console.log(data.job);

  return data.job;
};


export const getUserByUsername = async(username : string) => {
  try {
    const res =await axios.get(`/api/auth/${username}`);
    return res.data.user;
  } catch (error) {
    console.log(error);
    return null
  }
}