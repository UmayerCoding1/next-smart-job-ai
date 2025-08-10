import { Resume } from "@/app/models/Resume";
import { resumeCache } from "@/lib/cache";

 const updateResumeCacheForUser = async (userId: string) => {
  const latestResumes = await Resume.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  resumeCache.set(userId, latestResumes); 
  return latestResumes;
};


export { updateResumeCacheForUser };