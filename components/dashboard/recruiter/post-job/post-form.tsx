"use client";
import AppForm, { Input } from "@/components/shared/AppForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, Save, Send } from "lucide-react";
import React from "react";


const PostForm = () => {
  const handleSubmit = (data: { [key: string]: string }) => {
    console.log(data);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }
  return (
    <div className="h-full w-full bg-neutral-100">
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
          <Button variant={"ghost"} className="border border-neutral-300">
            <Eye />
            Preview
          </Button>
          <Button variant={"ghost"} className="border border-neutral-300">
            <Save />
            Save Draft
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <Send />
            Publish Job
          </Button>
        </div>
      </div>

      <div className=" mt-10 max-w-4xl mx-auto">
        <AppForm submitFn={handleSubmit}>
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

            <Row>
            <Input handleInput={{type: "redio_select",name: "experience level ",required: true,placeholder: "Select a deadline",}}label={true} options={['I', 'Z', 'M']}/>
            <Input handleInput={{type: "redio_select",name: "job jype ",required: true,placeholder: "Select a deadline",}}label={true} options={['Full-time', 'Part-time', 'Internship']}/>
            </Row>
          </Section>
     

        </Group>
      
        <button className="btn"> submit</button>
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