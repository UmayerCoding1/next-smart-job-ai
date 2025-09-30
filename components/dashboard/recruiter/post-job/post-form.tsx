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


const PostForm = () => {
  const user = useSelector((state: RootState) => state.authR.user);
  const handleSubmit = (data: { [key: string]: string }) => {
    
    formatJobData(data);
  };


   function formatJobData  (jobData: { [key: string]: string })  {  
   console.log(jobData);
   console.log(jobData.benefits);
   

  const jobTypeArray =  convertToArray(jobData.job_type,"text");
  const skillsArray =  convertToArray(jobData.skills,'json');
  const educationArray =  convertToArray(jobData.education,'json');
  const experienceLevelArray =  convertToArray(jobData.experience_level,'json');
  const requirementsArray =  convertToArray(jobData.requirements,'json');
//  const benefitsArray =  convertToArray(jobData.benefits,'text');

  // console.log(benefitsArray)

   const data: IDBDraftJobData =  {
    title: jobData.title,
    description: jobData.description,
    company: user?.company?._id.toString() || "",
    recruiter: user?._id && user?._id.toString() || "",
    location: jobData.location,
    salaryrange: {
      negotiable: jobData.negotiable === "true" ? true : false,
      min: Number(jobData.salaryrangeMin),
      max: Number(jobData.salaryrangeMax),
    },
    jobtype: jobTypeArray,
    skills: skillsArray,
    education: educationArray,
    experience: jobData.experience.split(","),
    experienceLevel: experienceLevelArray,
    dedline: new Date(jobData.dedline),
    category: jobData.category,
  
    workTime: {
      start: jobData.work_time_start,
      end: jobData.work_time_end,
    },
   requirements: requirementsArray,
    // shift: jobData.shift,
    // benefits: benefitsArray,
    vacancies: Number(jobData.vacancies),
    isRemoteAvailable: jobData.is_remote_available === "true" ? true : false,
    status: "draft",
    applicationsQuestions: [],
   

   }

  // console.log(data);
    
  }


   function convertToArray  (jsonData: string,dataType: 'json' | 'text') {
    console.log(jsonData);

     if(!jsonData ) return;
    if(dataType === 'json') {

      const jsonarray = JSON.parse(jsonData);
      return jsonarray;
    }else {
      if(dataType === 'text') {
         const array =  jsonData.split(",");
    
    return array;
    }
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

          <Button type="button" variant={"ghost"} className="border border-neutral-300 cursor-pointer active:scale-105">
            <Save />
            <p className="text-shadow-md text-shadow-neutral-300">
              Save Draft
            </p>
            
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 cursor-pointer group active:scale-105">
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
              <Input handleInput={{type: "dropdown", name: 'category', required: true}}   label options={['engineering', 'design', 'product', 'marketing','sales','Human Resources', 'finance']}/>
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
              <Input handleInput={{type: "dynamic_add_list", name: 'Application Questions', required: true}} label/>
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