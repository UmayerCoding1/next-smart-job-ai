import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
const FQAImage = "/assets/FQA.png";

const FQA = () => {
  return (
    <div className="mt-32 flex flex-col lg:flex-row gap-16 p-4 lg:p-0 items-start">
      <div className="w-full lg:w-1/2 order-2 lg:order-1">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          defaultValue="item-1"
        >
          {[
            {
              id: "item-1",
              q: "Advanced Job Search",
              a: "Filter jobs by location, industry, experience level, and salary to find the perfect fit. Our intelligent search system understands your preferences and surface the most relevant opportunities instantly."
            },
            {
              id: "item-2",
              q: "How does SmartJobAI match me with the right job?",
              a: "SmartJobAI uses advanced AI algorithms to analyze your resume, preferences, skills, and previous experiences. It then compares this data with job listings and company profiles to generate highly accurate job matches."
            },
            {
              id: "item-3",
              q: "Can SmartJobAI help improve my resume?",
              a: "Yes! Our platform offers AI-powered resume analysis that highlights weak points, suggests improvements, and ensures your resume is tailored to the jobs you're applying for."
            },
            {
              id: "item-4",
              q: "I'm a company — how does SmartJobAI help with hiring?",
              a: "Companies can post job listings, receive AI-matched candidates, and use SmartJobAI’s dashboard to manage applications, analyze resumes, and schedule interviews efficiently."
            },
            {
              id: "item-5",
              q: "Is my data secure with SmartJobAI?",
              a: "Your privacy is our priority. We use top-grade encryption and follow industry best practices to protect your personal and professional information."
            }
          ].map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border border-neutral-200 rounded-2xl px-6 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="text-lg font-bold text-neutral-800 hover:text-[#5c940d] hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 leading-relaxed pb-5 text-balance">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#93FE9C]/20 blur-3xl rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
            Common Questions <br />
            <span className="text-[#82C526]">About SmartJob AI</span>
          </h2>
          <p className="text-lg text-neutral-600 mt-6 font-medium leading-relaxed">
            Explore answers to the most commonly asked questions about
            SmartJobAI — from how our AI matches you with the best jobs and
            companies, to tips on improving your resume and maximizing your dashboard.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#82C526] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full"></div>
          <Image
            src={FQAImage}
            alt="FAQ Illustration"
            width={800}
            height={800}
            className="w-full max-w-[400px] mx-auto filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default FQA;
