

export const getJob = async (jobId: string) => {
  const res = await fetch(`/api/jobs/${jobId}`);
  const data = await res.json();
  console.log(data.job);

  return data.job;
};
