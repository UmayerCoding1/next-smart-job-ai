"use client";
import GostButton from "@/components/button/GostButton";
import FacebookIcon from "@/components/custom-icon/FacebookIcon";
import GithubIcon from "@/components/custom-icon/GithubIcon";
import InstagramIcon from "@/components/custom-icon/InstagramIcon";
import LinkedInIcon from "@/components/custom-icon/LinkedInIcon";
import TwitterIcon from "@/components/custom-icon/TwitterIcon";
import { CirclePlus, X } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import PrimaryButton from "@/components/button/PrimaryButton";

const SocialLink = () => {
  const [toatlink, setTotalLink] = useState<string[]>([]);
  const [linksData, setLinksData] = useState<{ title: string; link: string }[]>(
    [{ title: "", link: "" }]
  );
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon />,
    },
    {
      name: "Linkedin",
      icon: <LinkedInIcon />,
    },
    {
      name: "Github",
      icon: <GithubIcon />,
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
    },
    {
      name: "Twitter",
      icon: <TwitterIcon />,
    },
  ];

  // Handle social media name change
  const handleTitleChange = (index: number, value: string) => {
    const updated = [...linksData];
    updated[index].title = value;
    setLinksData(updated);
  };

  // Handle URL change
  const handleLinkChange = (index: number, value: string) => {
    const updated = [...linksData];
    updated[index].link = value;
    setLinksData(updated);
  };

  // Add new row
  const handleAddLink = () => {
    setLinksData((prev) => [...prev, { title: "", link: "" }]);
  };

  // Remove row
  const handleRemoveLink = (index: number) => {
    setLinksData((prev) => prev.filter((_, i) => i !== index));
  };

  // Save
  const handleSave = () => {
    console.log("Saved Links:", linksData);
    console.log("dsd");
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Social Links</h2>

      {linksData.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 mb-4">
          <p>Social Link {index + 1}</p>

          <div className="lg:flex items-center gap-4">
            {/* Select Social Media */}
            <div>
              <Select
                name={`social-media-${index}`}
                value={item.title}
                onValueChange={(value) => handleTitleChange(index, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a media" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Medias</SelectLabel>
                    {socialLinks.map((link) => (
                      <SelectItem key={link.name} value={link.name}>
                        <div className="flex items-center gap-2">
                          {link.icon}
                          {link.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Input URL */}
            <input
              type="url"
              id={`social-link-${index}`}
              name={`social-link-${index}`}
              value={item.link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              placeholder="https://www.example.com"
              className="border border-gray-200 rounded-md p-2 w-full"
            />

            {/* Remove button */}
            <button
              onClick={() => handleRemoveLink(index)}
              className="text-red-500 border border-red-500 p-2 rounded-full cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ))}

      <GostButton onClick={handleAddLink} className="w-full">
        <CirclePlus />
        Add new social link
      </GostButton>

      <PrimaryButton className="mt-5" onClick={handleSave}>
        Save Changes
      </PrimaryButton>
    </div>
  );
};

export default SocialLink;
