"use client";
import React, { useRef, useState } from "react";
import AppForm, { Input } from "../../shared/AppForm";
import { Label } from "@/components/ui/label";
import { ICompany } from "@/app/models/Company";
import { Button } from "@/components/ui/button";
import {  Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { imagekit } from "@/lib/ImageKitInstance";
import axios from "axios";

export interface ICompanyForm {
  name: string;
  email: string;
  website: string;
  description: string;
  location: string;
  logo: string;
  coverImage: string;
  industry: string;
  recruiter: string;
}

const CompanyProfileForm = ({
  company,
  userid,
}: {
  company: ICompany | null;
  userid: string;
}) => {
  console.log(company);
  const [logoImagePreview, setLogoImagePreview] = useState<{
    url: string;
    name: string;
    size: number;
  } | null>({
    url: company?.logo || "",
    name: "",
    size: 0,
  });
  const [bannerImagePreview, setBannerImagePreview] = useState<{
    url: string;
    name: string;
    size: number;
  } | null>({
    url: company?.coverImage || "",
    name: "",
    size: 0,
  });
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);
  const logoImageRef = useRef<HTMLInputElement | null>(null);
  const bannerImageRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = e.target.name;

    if (file) {
      const convertSizeInMB = file?.size / (1024 * 1024);
      if (logoImageRef.current) {
        // setLogoImagePreview(null);
        logoImageRef.current.value = "";
      }
      if (bannerImageRef.current) {
        setBannerImagePreview(null);
        bannerImageRef.current.value = "";
      }

      if (convertSizeInMB > 4) {
        toast.error("Image size must be less than 4MB", { duration: 1500 });
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;

        if (name === "logo") {
          setIsLogoUploading(true);
          const uploadelogo = await imagekit.upload({
            file: result,
            fileName: file.name,
            isPublished: true,
            useUniqueFileName: false,
          });

          if (uploadelogo.url) {
            setIsLogoUploading(false);
            setLogoImagePreview({
              url: uploadelogo.url,
              name: file.name,
              size: Number(convertSizeInMB.toFixed(2)),
            });
            toast.success("Company logo uploaded successfully", {
              duration: 1500,
            });
          }
        }

        if (name === "banner") {
          setIsBannerUploading(true);
          const uploadelogo = await imagekit.upload({
            file: result,
            fileName: file.name,
            isPublished: true,
            useUniqueFileName: false,
          });

          if (uploadelogo.url) {
            setIsBannerUploading(false);
            setBannerImagePreview({
              url: uploadelogo.url,
              name: file.name,
              size: Number(convertSizeInMB.toFixed(2)),
            });
            toast.success("Company banner uploaded successfully", {
              duration: 1500,
            });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogoImagePreview = (filename: string) => {
    if (filename === "logo") {
      setLogoImagePreview(null);
      if (logoImageRef.current) {
        logoImageRef.current.value = "";
        toast.warning("Clearing previous image", { duration: 1500 });
      }
    }

    if (filename === "banner") {
      setBannerImagePreview(null);
      if (bannerImageRef.current) {
        bannerImageRef.current.value = "";
        toast.warning("Clearing previous image", { duration: 1500 });
      }
    }
  };
  const handleSubmit = async (data: { [key: string]: string }) => {
    console.log({
      ...data,
      logo: logoImagePreview?.url,
      coverImage: bannerImagePreview?.url,
      recruiter: userid,
    });
    if (!logoImagePreview || !bannerImagePreview) return;
    try {
      const companyUpdateData: ICompanyForm = {
        name: data.name,
        email: data.email,
        website: data.website,
        description: data.description,
        location: data.location,
        industry: data.Industry,
        logo: logoImagePreview?.url,
        coverImage: bannerImagePreview?.url,
        recruiter: userid,
      };
      console.log(companyUpdateData);

      const res = await axios.post("/api/company", companyUpdateData);
      if (res.data.message) {
        toast.success(res.data.message, { duration: 1500 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("bannerImagePreview", bannerImagePreview);
  return (
    <div>
      <AppForm submitFn={handleSubmit}>
        <div>
          <h2 className="text-xl font-semibold">Logo and bannar image</h2>
          <div className="flex flex-col lg:flex-row gap-5 mt-5">
            <div className="w-full flex flex-col lg:flex-row gap-5">
              <div className={logoImagePreview ? "w-full lg:w-1/2" : "w-full"}>
                <h2>Upoad Logo</h2>
                <Input
                  handleInput={{
                    type: "file",
                    name: "logo",
                    placeholder: "Your Company Description",
                  }}
                  className="hidden"
                  id="company-logo"
                  accept="image/*"
                  ref={logoImageRef}
                  imageandleChange={handleFileChange}
                />

                <label
                  htmlFor="company-logo"
                  className="cursor-pointer transition duration-300 flex items-center justify-center rounded-lg h-40  gap-2 border-2 border-dashed border-gray-200 w-full bg-gray-100 overflow-hidden"
                >
                  {logoImagePreview ? (
                    <div className="relative w-full">
                      <Image
                        src={logoImagePreview.url}
                        width={100}
                        height={100}
                        alt="logo"
                        className="w-full h-36 object-contain"
                      />
                      <Button
                        variant={"destructive"}
                        className="mt-2 absolute top-0 right-0"
                        onClick={() => clearLogoImagePreview("logo")}
                      >
                        Clear
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center  text-gray-500">
                      {isLogoUploading ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          <UploadCloud />F
                          <p className="text-gray-500">Upload Logo</p>
                          <p>Max Size: 4MB</p>
                        </>
                      )}
                    </div>
                  )}
                </label>
              </div>

              <div className={logoImagePreview ? "w-full lg:w-1/2" : "w-full"}>
                <h2>Upoad Banner</h2>
                <Input
                  handleInput={{
                    type: "file",
                    name: "banner",
                  }}
                  className="hidden"
                  id="company-banner"
                  accept="image/*"
                  ref={bannerImageRef}
                  imageandleChange={handleFileChange}
                />

                <label
                  htmlFor="company-banner"
                  className="cursor-pointer transition duration-300 flex items-center justify-center rounded-lg h-40  gap-2 border-2 border-dashed border-gray-200 w-full bg-gray-100 overflow-hidden"
                >
                  {bannerImagePreview ? (
                    <div className="relative">
                      <Image
                        src={bannerImagePreview.url}
                        width={100}
                        height={100}
                        alt="logo"
                        className="w-full h-36 object-contain"
                      />
                      <Button
                        variant={"destructive"}
                        className="mt-2 absolute top-0 right-0"
                        onClick={() => clearLogoImagePreview("banner")}
                      >
                        Clear
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center  text-gray-500">
                      {isBannerUploading ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          <UploadCloud />
                          <p className="text-gray-500">Upload Banner</p>
                          <p>Max Size: 4MB</p>
                        </>
                      )}
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Label htmlFor="name">Company Name</Label>
          <Input
            handleInput={{
              type: "text",
              name: "name",
              placeholder: "Your Company Name",
              value: company?.name,
            }}
          />
        </div>

        <div className="w-full">
          <Label htmlFor="email">Company Email</Label>
          <Input
            handleInput={{
              type: "email",
              name: "email",
              placeholder: "Your Company Email",
              value: company?.email,
            }}
          />
        </div>

        <div className="w-full">
          <Label htmlFor="Description">Company Description</Label>
          <Input
            handleInput={{
              type: "textarea",
              name: "description",
              placeholder: "Your Company Description",
              value: company?.description,
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-center">
          <div className="w-full">
            <Label htmlFor="website link">Website</Label>
            <Input
              handleInput={{
                type: "url",
                name: "website",
                placeholder: "Add your website link",
                value: company?.website,
              }}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="industry">Industry</Label>
            <Input
              handleInput={{
                type: "text",
                name: "Industry",
                placeholder: "Add your website link",
                value: company?.industry,
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="industry">Location</Label>
          <Input
            handleInput={{
              type: "text",
              name: "location",
              placeholder: "Add your company location",
              value: company?.location,
            }}
          />
        </div>

        {company ? (
          <Button
            type="submit"
            className="bg-gradient-to-tr from-blue-500 to-blue-800"
          >
            Update
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-gradient-to-tr from-blue-500 to-blue-800"
          >
            Add Company
          </Button>
        )}
      </AppForm>

      {/* <div className="flex flex-col gap-5 items-center justify-center h-[230px]">
          <p>Company not found! please add company first</p>
          <Button className="cursor-pointer">
            <Link href="/add-company">Add Company</Link>
          </Button>
        </div> */}
    </div>
  );
};

export default CompanyProfileForm;
