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
           <Row>
            <Input handleInput={{type:"text",name:"title",required:true,placeholder:"Job Title"}} label={true}/>
             <Input handleInput={{type:"text",name:"description2",required:true,placeholder:"Job Description"}} label={true}/>
           </Row>


        <div>
            <Input handleInput={{type:"text",name:"description",placeholder:"Job Description"}} label={true}/>
        </div>

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