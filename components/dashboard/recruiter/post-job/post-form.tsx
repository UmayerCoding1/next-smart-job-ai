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
  return (
    <div className="h-full w-full">
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
          <Button>
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
             <Input handleInput={{type:"text",name:"location",required:true,placeholder:"Job Location "}} label/>
           </Row>
             <Row className="mt-1">
              <Input handleInput={{type: "dropdown", name: 'category'}}   label dropdownValue={['engineering', 'design', 'product', 'marketing','sales','Human Resources', 'finance']}/>
               <Input
    handleInput={{
      type: "date",
      name: "deadline",
      required: true,
      placeholder: "Select a deadline",
    }}
    label={true}
  />
           </Row>
            </Column>




        
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