import { resumeToText } from "@/service/getPdfData";
import { savePdfToFile } from "@/service/savePDfToFile";

export async function getMatchScore(resumeLink: string, jobId: string) {
    try {
        if (!resumeLink) return 0;
        const pdf = await savePdfToFile(resumeLink);
        if (!pdf) {
            return 0;
        }

        const pdfData = await resumeToText(pdf, jobId);

        if (!pdfData) return 0;

        return pdfData;
    } catch (error) {
        console.log(error);
    }
}