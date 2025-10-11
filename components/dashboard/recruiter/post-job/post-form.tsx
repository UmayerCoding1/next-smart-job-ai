"use client";

import AppForm, { Input } from "@/components/shared/AppForm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {v4 as uuidV4} from "uuid"
import { Eye, Save, Send } from "lucide-react";
import React from "react";
import { IDBDraftJobData } from "@/lib/types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addDraftJobIDB } from "@/utils/indexedDB";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const PostForm = () => {
  const user = useSelector((state: RootState) => state.authR.user);
  const router = useRouter();
  // ----------------- Submit Handler -----------------
  const handleSubmit = (data: { [key: string]: string }) => {
    const jobData = formatJobData(data);
    const eventStatus = localStorage.getItem("eventStatus");
    if (eventStatus === "draft") {
      saveToDarft(jobData);
    } else if (eventStatus === "publish") {
      
      console.log("Publish Data:", jobData);
    }
  };

  // ----------------- Save Draft Handler -----------------
  const saveToDarft = async (jobData: IDBDraftJobData) => {
   const data = {...jobData, _id: uuidV4()}
   console.log(data)
   if (!data) {
     return toast.error("An error occurred", { duration: 1500 });
   }
   try {
    await addDraftJobIDB(data);
     toast.success("Job saved to draft successfully", { duration: 1500 });
     router.push('/dashboard/recruiter')
   } catch (error) {
     console.log(error);
     toast.error("An error occurred", { duration: 1500 });
   }
    
  };

  // ----------------- Formatter -----------------
  function formatJobData(jobData: { [key: string]: string }) {
    const jobTypeArray = convertToArray(jobData.job_type, "text");
    const skillsArray = convertToArray(jobData.skills, "json");
    const educationArray = convertToArray(jobData.education, "json");
    const experienceLevelArray = convertToArray(jobData.experience_level, "text");
    const requirementsArray = convertToArray(jobData.requirements, "json");
    const benefitsArray = convertToArray(jobData.benefits, "json");
    const shiftArray = convertToArray(jobData.shift, "text");
    const application_QuestionsArray = convertToArray(jobData.Application_Questions, "json");

    const data: IDBDraftJobData = {
      title: jobData.title || "",
      description: jobData.description || "",
      company: user?.company?._id?.toString() || "",
      recruiter: user?._id?.toString() || "",
      location: jobData.location || "",
      salaryrange: {
        negotiable: jobData.negotiable === "true",
        min: Number(jobData.min_salary) || 0,
        max: Number(jobData.max_salary) || 0,
      },
      jobtype: jobTypeArray || [],
      skills: skillsArray || [],
      education: educationArray || [],
      experience: requirementsArray || [],
      experienceLevel: experienceLevelArray || [],
      dedline: jobData.deadline || "",
      category: jobData.category || "",
      workTime: {
        start: jobData.work_time_start || "",
        end: jobData.work_time_end || "",
      },
      requirements: requirementsArray || [],
      shift: shiftArray || [],
      benefits: benefitsArray || [],
      vacancies: Number(jobData.Vacancies) || 0,
      isRemoteAvailable: jobData.isRemote === "true",
      applicationsQuestions: application_QuestionsArray || [],
      status: "draft",
    };

    return data;
  }

  // ----------------- Helper -----------------
  function convertToArray(jsonData: string | undefined, dataType: "json" | "text") {
    if (!jsonData) return [];
    try {
      if (dataType === "json") {
        return JSON.parse(jsonData);
      } else {
        return jsonData.split(",").map((item) => item.trim()).filter(Boolean);
      }
    } catch (err) {
      console.error("Invalid array data:", jsonData, err);
      return [];
    }
  }
  return (
    <div className="h-full w-full">
      

      <div className=" mt-10 max-w-6xl mx-auto">
        <AppForm submitFn={handleSubmit}>
          <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800  to-neutral-400    ">
            Post a New Job
          </h1>
          <p className="text-[12px] font-medium text-neutral-500">
            Create a compelling job posting to attract the best candidates
          </p>
        </div>

        <div className="flex items-center gap-2">

          <Button type="submit" variant={"ghost"} className="border border-neutral-300 cursor-pointer active:scale-105"
            onClick={() => {
    
            localStorage.setItem("eventStatus", "draft");
  }}
          >
            <Save />
            <p className="text-shadow-md text-shadow-neutral-300">
              Save Draft
            </p>
            
          </Button>
          <Button
           type="submit"
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer group active:scale-105"
          onClick={() => {
            localStorage.setItem("eventStatus", "publish");
          }}
          >
            <Send />
            <p className="text-shadow-2xs text-shadow-neutral-700 group-hover:text-shadow-none ">Publish Job</p>
          </Button>
        </div>
      </div>
        <Group>
          
          <Section> 
             <TitleAndSubTitle
              title="Job Basics"
              subtitle="Provide the essential details of the job to help candidates understand the role at a glance."
             />
            
            <Column>
             <Row>
            <Input handleInput={{type:"text",name:"title",required:true,placeholder:"Job Title"}} label/>
            <Column className="w-full">
             <Input handleInput={{type:"text",name:"location",required:true,placeholder:"Job Location "}} label/>
             <div className="flex   items-center justify-between w-60  ">
              <h2 className=" w-1/2 mb-2 text-neutral-800 font-medium text-sm">Is Remote</h2>
              <Input handleInput={{type:"chackbox",name:"isRemote",placeholder:"Job Location "}} />
             </div>
            </Column>

           </Row>
             <Row className="mt-1">
              <Input handleInput={{type: "dropdown", name: 'category', required: true}}   label options={['engineering','Software Development', 'design', 'product', 'marketing','sales','Human Resources', 'finance']}/>
               <Input handleInput={{type: "date",name: "deadline",required: true,placeholder: "Select a deadline",}}label={true}/>
           </Row>
            </Column>        
          </Section>

          <Section>
            <TitleAndSubTitle
             title="Job Details"
             subtitle="Add a detailed description of the role, qualifications, and expectations."
            />


            <Column className="gap-4">
              <Input handleInput={{type:"textarea",name:"description",required:true,placeholder:"Job Description"}} label={true}/>
              <Input handleInput={{type: "dynamic_add_list", name: 'requirements', required: true}} label /> 
              <Input handleInput={{type: "dynamic_add_list", name: 'skills', required: true}} label dynamic_add_list_style="row" /> 
              <Input handleInput={{type: "dynamic_add_list", name: 'education'}} label /> 
              <Input handleInput={{type: "dynamic_add_list", name: 'responsibilities', required: true}} label /> 
              
            </Column>
          </Section>


          <Section>
            <TitleAndSubTitle
            title="Work & Experience"
            subtitle="Define the type of work, work schedule, and the required level of experience."
            />

           <Column className="gap-4">
            <Row className="gap-5">
            <Input handleInput={{type: "redio_select",name: "experience_level",required: true,placeholder: "Select a deadline",}}label={true} options={['Internship', 'Entry', 'Mid', 'Senior', 'Lead']}/>
            <Input handleInput={{type: "redio_select",name: "job_type",required: true,placeholder: "Select a deadline",}}label={true} options={['Full-time', 'Part-time', 'Internship']}/>
            </Row>

            <Row className="gap-5">
               <Input handleInput={{type: "redio_select",name: "shift",required: true,placeholder: "Select a deadline",}}label={true} options={['Day', 'Night', 'Flexible']}/>
               <Input handleInput={{type: "redio_select",name: "work_location_type",required: true,placeholder: "Select a deadline",}}label={true} options={['On-site', 'Hybrid', 'Remote','Flexible']}/>
            </Row>


            <Row>
             <Label>Work Times :</Label>

              <Column>
               <Input handleInput={{type: 'text' ,name: 'work_time_start',required: true,placeholder: "Work Time start", }}/>
               <Input handleInput={{type: 'text' ,name: 'work_time_end',required: true,placeholder: "Work Time end", }}/>
              </Column>
            </Row>

             <Input handleInput={{type: "dynamic_add_list", name: 'holiday policy', required: true}} label /> 
           </Column>
          </Section>

          <Section className="relative">

            <TitleAndSubTitle
             title="Salary Information"
             subtitle="Specify salary details clearly to attract the right candidates."
            />

            <Column>
             <Row className="">
              <Label>Negotiable: </Label>
              <Input handleInput={{type:"chackbox",name:"negotiable",placeholder:"Job Location "}} />
            
             </Row>
    

              <Row className="items-center">
              <Input handleInput={{type:"text",name:"min_salary",required:true,placeholder:"Min Salary", defaultValue:"0"}} label/>-
              <Input handleInput={{type:"text",name:"max_salary",required:true,placeholder:"Max Salary", defaultValue:"0"}} label/>
              </Row>
            </Column>


            
          </Section>

          <Section>
            <TitleAndSubTitle
             title="Benefits & Perks"
             subtitle="Highlight the value your company provides to employees."
            />


            <Column>
              <Input handleInput={{type: "dynamic_add_list", name: 'benefits', required: true}} label/>
              <Input handleInput={{type: "text", name: 'Vacancies', required: true, defaultValue:"2"}} label/>
              
            </Column>
          </Section>
          <Section>
            <TitleAndSubTitle
             title="Application Process"
             subtitle="Customize how candidates apply and what information you need."
            />


            <Column>
              <div className="flex flex-col gap-2 overflow-hidden">
              <Input handleInput={{type: "dynamic_add_list", name: 'Application_Questions', required: true}} label/>
              {/* <Input handleInput={{type: "dropdown", name: 'Application Questions', required: true}} label/> */}
                
              </div>
              
            </Column>
          </Section>
     

        </Group>
      
      </AppForm>
      </div>
    </div>
  );
};

export default PostForm;








const Group = ({children,className}: {children:React.ReactNode,className?:string}) => {
  return (
    <div className={cn("flex flex-col gap-2",className)}>
      {children}
    </div>
  );
};

const Section = ({children,className} : {children: React.ReactNode, className?: string}) => {
    return <div className={cn( 'w-full  shadow-lg  px-3 py-5 rounded-xl border border-neutral-200 bg-white dark:bg-neutral-800 mb-3',className)}>
         {children}
    </div>
}


const Column = ({children,className}: {children:React.ReactNode,className?:string}) => {
  return (
    <div className={cn("flex flex-col gap-2",className)}>
      {children}
    </div>
  );
};

const Row = ({children,className}: {children:React.ReactNode,className?:string}) => {
  return (
    <div className={cn("flex gap-2",className)}>
      {children}
    </div>
  );
};


const TitleAndSubTitle = ({title,subtitle} : {title: string, subtitle: string}) => {
   return <div className="mt-2 mb-4  pb-3 border-b border-neutral-200">
       <h1 className="text-2xl font-semibold text-neutral-800">{title}</h1>
       <p className="text-sm font-medium text-neutral-600">{subtitle}</p>
   </div>
}