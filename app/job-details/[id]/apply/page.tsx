"use client";
import { IJob } from "@/app/models/Job";
import { RootState } from "@/app/redux/store";

import ApplyForm from "@/components/form/applyForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getJob } from "@/service/api";
import { Edit, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomBreadcrumb from "../../../../components/ui/custom/CustomBreadcrumb";
const applyImage = "/assets/apply.png";

const ApplyPage = (Context: { params: Promise<{ id: string }> }) => {
  const [job, setJob] = useState<IJob | null>(null);
  const [score, setScore] = useState(0);
  const user = useSelector((state: RootState) => state.authR.user);
  const [commpleteApplyProgress, setCommpleteApplyProgress] = useState(
    (score / 100) * 100
  );
  const [isExpired, setIsExpired] = useState(false);
  const [fixedBreadcrumb, setFixedBreadcrumb] = useState(false);
  const [windowPosition, setWindowPosition] = useState(0);

  const router = useRouter();

  const id = use(Context.params);

  useEffect(() => {
    const interval = setInterval(() => {
      const appliedAt = sessionStorage.getItem("appliedAt");

      if (!appliedAt) {
        clearInterval(interval);
        router.push("/expired");
        return;
      }

      const appliedTime = new Date(appliedAt).getTime();
      const now = Date.now();
      const diff = now - appliedTime;

      if (diff > 1 * 60 * 60 * 60 * 1000) {
        clearInterval(interval);
        router.push("/expired");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleJob = async () => {
      const job: IJob = await getJob(id.id);
      setJob(job);
    };

    handleJob();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => setCommpleteApplyProgress(score), 500);

    return () => clearTimeout(timer);
  }, [score]);

  const links = [
    { href: "/", label: "Home" },
    { href: `/job-details/${id.id}`, label: "Job Details" },
  ];

  useEffect(() => {
    //  window.scrollTo(0, 0);
    if (isExpired) {
      sessionStorage.removeItem("appliedAt");
      router.push("/expired");
      return;
    }
  });

  useEffect(() => {
    if (windowPosition > 300) {
      setFixedBreadcrumb(true);
    } else {
      setFixedBreadcrumb(false);
    }
    const handleScroll = () => {
      setWindowPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [windowPosition, fixedBreadcrumb]);

  const handleUrlSessionIsValid = () => {
    sessionStorage.setItem("appliedAt", new Date().toISOString());
  };
  return (
    <div onMouseMove={handleUrlSessionIsValid} className="bg-gray-50">
      <div className="w-full h-[300px] bg-black flex items-center justify-evenly text-white">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-semibold">Apply this job</h2>
          <h2 className=" text-xl lg:text-3xl">{job?.title}</h2>
          <p>
            {" "}
            {typeof job?.company === "object" && "name" in job?.company
              ? job?.company.name
              : "N/A"}
          </p>
        </div>
        <Image
          src={applyImage}
          alt="login form image"
          width={800}
          height={800}
          className="w-96 ovject-cover hidden md:block lg:block"
        />
      </div>

      <div className="max-w-7xl mx-auto p-2 mt-5 relative">
        <div
          className={`flex flex-col lg:flex-row lg:items-center gap-4  justify-between w-full p-3 my-2 rpunded-lg shadow-lg border  border-gray-200 rounded-sm ${
            fixedBreadcrumb
              ? "fixed top-16 z-50  max-w-7xl mx-auto bg-gray-100"
              : "bg-white"
          }`}
        >
          <CustomBreadcrumb link={links} currentPage="Job apply page" />

          <div className=" w-full lg:w-[300px] relative   rounded-full">
            <Progress value={commpleteApplyProgress} className="w-full " />

            {score > 0 && score < 100 && (
              <div
                className={`relative  top-1 bg-black text-white text-xs p-2 rounded-sm flex items-center gap-2 before:absolute before:-left-0 before:-top-[10px] before:border-[6px] before:border-transparent before:border-b-black before:content-[''] w-32 transition-all duration-500 ease-in-out `}
                style={{ left: `${commpleteApplyProgress - 2}%` }}
              >
                <span>You have completed</span>
                <span className="font-bold text-emerald-500">
                  {commpleteApplyProgress}%
                </span>
              </div>
            )}

            {score === 100 && (
              <span>You have completed {commpleteApplyProgress}%</span>
            )}
          </div>
        </div>

        <div className=" ">
          <div className="lg:flex justify-between  w-full gap-10 ">
            <ApplyForm user={user} job={job} setScore={setScore} />
            <div className="bg-white w-[30%] h-1/3 p-3">
              <div className="flex items-center gap-2">
                <div>
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="login form image"
                      width={800}
                      height={800}
                      className="w-full h-full ovject-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full ">
                      <User size={40} className="text-gray-400" />
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-medium">{user?.fullname}</h2>
                  <h2 className="text-sm">{user?.email}</h2>
                  <h2 className="text-sm">
                    {user?.phone ? user?.phone : "N/A"}
                  </h2>
                </div>

                <Button className="">
                  <Edit />
                  <span>Edit</span>
                </Button>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-semibold mt-5">
                  Please read before apply *
                </h2>
                <p>
                  SmartJobAi.com Limited will not be responsible for any
                  financial transactions or fraud by the company after applying
                  through the website. The company only connects companies and
                  job seekers.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mt-5">Quick link</h2>
                <ul>
                  <li>Help</li>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default ApplyPage;
