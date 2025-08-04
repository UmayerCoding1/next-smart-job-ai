"use client";

import React, { createContext, useContext, useState } from "react";

interface contextTypes {
  resumedata: {
    url: string;
    name: string;
    file: File | null;
  };
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ResumeUploadProvider = createContext<contextTypes | null>(null);
const ResumeUpload = ({
  children,
  handleGetFileData,
  className,
}: {
  children: React.ReactNode;
  handleGetFileData: (pdfdata: { url: string; name: string; file: File }) => void;
  className?: string;
}) => {
  const [resumedata, setResumeData] = useState<{
    url: string;
    name: string;
    file: File | null;
  }>({
    name: "",
    url: "",
    file: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setResumeData({
          url: result,
          name: file.name,
          file: file,
        });
        handleGetFileData({ url: result, name: file.name, file: file });
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <ResumeUploadProvider value={{ resumedata, handleFileChange }}>
      <div className={className}>{children}</div>
    </ResumeUploadProvider>
  );
};

export default ResumeUpload;

export const ResumeUploadInput = ({
  handleFileInput,
}: {
  children?: React.ReactNode;
  handleFileInput: {
    id: string;
    className?: string;
  };
}) => {
  const context = useContext(ResumeUploadProvider);
  if (!context) {
    throw new Error(
      "useResumeUpload must be used within a ResumeUploadProvider."
    );
  }

  const {  handleFileChange } = context;
  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        id={handleFileInput.id}
        className={`${handleFileInput.className} hidden`}
        onChange={handleFileChange}
      />
    </div>
  );
};
