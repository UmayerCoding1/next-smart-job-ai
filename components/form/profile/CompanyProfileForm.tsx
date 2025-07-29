"use client";
import React, { useRef, useState } from "react";
import AppForm, { Input } from "../AppForm";
import { Label } from "@/components/ui/label";
import { ICompany } from "@/app/models/Company";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const CompanyProfileForm = ({ company }: { company: ICompany | null }) => {
  console.log(company);
  const [logoImagePreview, setLogoImagePreview] = useState<{
    url: string;
    name: string;
    size: number;
  } | null>(null);
  const logoImageRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const convertSizeInMB = file?.size / (1024 * 1024);
      if (logoImageRef.current) {
        // setLogoImagePreview(null);
        logoImageRef.current.value = "";
      }

      if (convertSizeInMB > 4) {
        toast.error("Image size must be less than 4MB", { duration: 1500 });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setLogoImagePreview({
          url: result,
          name: file.name,
          size: Number(convertSizeInMB.toFixed(2)),
        });
      };
      reader.readAsDataURL(file);
      toast.success("Image uploaded successfully", { duration: 1500 });
    }
  };

  const clearLogoImagePreview = () => {
    setLogoImagePreview(null);
    if (logoImageRef.current) {
      logoImageRef.current.value = "";
      toast.warning("Clearing previous image", { duration: 1500 });
    }
  };
  const handleSubmit = (data: { [key: string]: string }) => {
     console.log(data);
  };
  return (
    <div>
      {company ? (
        <AppForm submitFn={handleSubmit}>
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
                name: "decription",
                placeholder: "Your Company Description",
                value: company?.description,
              }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className={logoImagePreview ? "w-full lg:w-1/2" : "w-full"}>
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
                className="cursor-pointer transition duration-300 flex items-center justify-center rounded-lg h-14  gap-2 border w-full"
              >
                <CloudUpload size={13} />
                Upload Logo
              </label>
            </div>

            {logoImagePreview && (
              <div className="px-2 py-1 flex  flex-col gap-2 shadow border border-gray-200 rounded-lg  w-full lg:w-1/2">
                <div className="flex gap-2">
                  <Image
                    src={logoImagePreview.url && logoImagePreview.url}
                    alt="update profile picture"
                    width={800}
                    height={800}
                    loading="lazy"
                    className="w-12 h-12 rounded-2xl object-cover rounded- shadow"
                  />

                  <div className="flex items-center justify-between w-full">
                    <div>
                      <h2 className="font-semibold">
                        {logoImagePreview?.name.slice(0, 20).concat("...")}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {logoImagePreview.size} MB
                      </p>
                    </div>

                    <X
                      size={15}
                      onClick={() => clearLogoImagePreview()}
                      className="text-red-500"
                    />
                  </div>
                </div>
              </div>
            )}
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

          {company ? (
            <Button type="submit" className="bg-gradient-to-tr from-blue-500 to-blue-800">
              Update
            </Button>
          ) : (
            <Button type="button" className="bg-gradient-to-tr from-blue-500 to-blue-800">
              Add Company
            </Button>
          )}
        </AppForm>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center h-[230px]">
          <p>Company not found! please add company first</p>
          <Button className="cursor-pointer">
            <Link href="/add-company">Add Company</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompanyProfileForm;
