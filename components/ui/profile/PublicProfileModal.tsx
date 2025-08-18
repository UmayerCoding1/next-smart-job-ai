"use client";
import { IUser } from "@/app/models/User";
import Image from "next/image";
import React from "react";
import { UserImage } from "./Profile";
import { FileText, Mail, Phone, UserCircle2, CalendarDays } from "lucide-react";
import { Button } from "../button";
import FacebookIcon from "@/components/custom-icon/FacebookIcon";
import Link from "next/link";
import GithubIcon from "@/components/custom-icon/GithubIcon";
import InstagramIcon from "@/components/custom-icon/InstagramIcon";

interface Props {
  setIsOpenPublicProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
}

const PublicProfileModal = ({ setIsOpenPublicProfileModal, user }: Props) => {
  if (!user) return null;

  return (
    <div
      onClick={() => setIsOpenPublicProfileModal(false)}
      className="w-full h-screen fixed top-0 left-0 z-[100] bg-black/40 flex justify-center items-center p-3"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg"
      >
        {/* Cover Image */}
        <div
          className="h-48 w-full bg-cover bg-center rounded-t-lg"
          style={{ backgroundImage: `url(${user.coverImage})` }}
        />

        {/* Profile Header */}
        <div className="flex items-center gap-6 p-6 border-b">
          <Image
            src={user.avatar || UserImage}
            alt="avatar"
            width={160}
            height={160}
            className="w-40 h-40 object-cover rounded-full border-4 border-white -mt-20 shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.fullname}</h1>
            <p className="text-gray-500">@{user.username}</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Mail size={16} /> {user.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={16} /> {user.phone}
              </span>
              <span className="flex items-center gap-1">
                <UserCircle2 size={16} /> {user.role}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={16} /> Joined{" "}
                {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <FileText size={18} /> Resume
          </Button>
        </div>

        {/* Profile Details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-600">
                {user.about || "No about information provided."}
              </p>
            </section>

            {/* <section>
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              {user.education && user.education.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-600">
                  {user.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No education details added.</p>
              )}
            </section> */}
          </div>

          <div className="space-y-6">
            <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Profile Stats</h2>
              <p className="text-gray-600">
                Profile Completion: {user.profileComplete}%
              </p>
              <p className="text-gray-600">
                Views: {user.profileView?.count || 0}
              </p>
              <p className="text-gray-600">Status: {user.status}</p>
              <p className="text-gray-600">
                Subscription: {user.subscription?.plan || "free"}
              </p>
            </section>

            <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Social Links</h2>
              {user.socialLinks && user.socialLinks.length > 0 ? (
                <ul className="flex items-center gap-3">
                  {user.socialLinks.map((link, idx) => (
                    <li key={idx}>
                      {link.platform === "Facebook" && (
                        <Link href={link.link} target="_blank">
                          
                          <FacebookIcon size={20}/>
                        </Link>
                      )}
                      {link.platform === "Github" && (
                        <Link href={link.link} target="_blank">
                         
                          <GithubIcon size={20}/>
                        </Link>
                      )}

                       {link.platform === "Instagram" && (
                        <Link href={link.link} target="_blank">
                         
                          <InstagramIcon size={20}/>
                        </Link>
                      )}
                    </li>
                    
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No social links added.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileModal;
