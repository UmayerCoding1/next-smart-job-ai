import fs from "fs/promises";

import { IJob, Job } from "@/app/models/Job";

import { GoogleGenerativeAI } from "@google/generative-ai";
const GEMINI_API_KEY = process.env.RESUME_SCHORE_AI_API_KEY!;
import { extractText } from "unpdf";

// get pdf data
const getPdfData = async (filePath: string) => {
  try {
    const pdfFile = await fs.readFile(filePath);
    const uint8 = new Uint8Array(pdfFile);
    const { text } = await extractText(uint8);

    return text;
  } catch (error) {
    console.error("Error in getPdfData:", error);
    return null;
  }
};
// Convert PDF to text via backend
export async function resumeToText(filePath: string, jobId: string) {
  try {
    const resumeText = await getPdfData(filePath);

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
      console.log("Job not found");
      return;
    }

    const score = await matchResumeToJobScore(job, resumeText as string[]);
    await fs.unlink(filePath);
    return score;
  } catch (error) {
    console.error("Error in resumeToText:", error);
    return null;
  }
}

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

async function getAiMatchScore(resumeText: string[], jobText: string) {
  const genAi = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAi.getGenerativeModel({ model: "text-embedding-004" });

  const resumeEmbed = await model.embedContent(resumeText);
  const jobEmbed = await model.embedContent(jobText);

  const vecA = resumeEmbed.embedding.values;
  const vecB = jobEmbed.embedding.values;

  const score = cosineSimilarity(vecA, vecB) * 100;

  return {
    score: Number(score.toFixed(2)),
    summary: "Fast ATS score using embeddings",
  };
}

// Main matching function
export const matchResumeToJobScore = async (
  jobData: IJob,
  resumeText: string[]
): Promise<number> => {
  try {
    // Extract only relevant fields

    const result = await getAiMatchScore(resumeText, JSON.stringify(jobData));

    return result.score;
  } catch (error) {
    console.error("Error in matchResumeToJobScore:", error);
    return 0;
  }
};
