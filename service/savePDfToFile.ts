// app/api/save-pdf/route.ts

import fs, { stat } from "fs";
import path from "path";

export const savePdfToFile = async function (pdfUrl: string) {
  try {
    if (!pdfUrl) return false;

    // Fetch the PDF
    const response = await fetch(pdfUrl);
    if (!response.ok) throw new Error("Failed to fetch PDF");

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Extract file name from URL
    const urlParts = pdfUrl.split("/");
    let fileName = urlParts[urlParts.length - 1]; 

    // Remove query parameters
    fileName = fileName.split("?")[0];

    // Ensure it ends with .pdf
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      fileName += ".pdf";
    }
    // Define the folder and file path
    const folderPath = path.join(process.cwd(), "public", "pdfs");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true }); 
    }

    const filePath = path.join(folderPath, fileName);

    // Save the PDF to the folder
    fs.writeFileSync(filePath, uint8Array);

    return filePath;
  } catch (error) {
    console.error("Error saving PDF:", error);
   throw error;
  }
};
