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
    <div className="mt-20 flex gap-10">
      <Accordion
        type="single"
        collapsible
        className="w-full lg:w-1/2"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">
            Advanced Job Search
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-sm">
              Filter jobs by location, industry, experience level, and salary to
              find the perfect fit. Cras eget egestas diam. Maecenas id arcu
              justo. Cras et elit sed velit malesuada ultricies ac nec nunc.
              Etiam posuere tempus ipsum et aliquet. Nulla nec orci et felis
              dignissim. Maecenas suscipit velit orci, non lobortis nulla
              ullamcorper quis. Nullam nec rhoncus nunc. Nulla facilisi. Duis
              massa elit, pretium vitae sodales eget, faucibus ut dui.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">
            How does SmartJobAI match me with the right job?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-sm">
              SmartJobAI uses advanced AI algorithms to analyze your resume,
              preferences, skills, and previous experiences. It then compares
              this data with job listings and company profiles to generate
              highly accurate job matches.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl">
            Can SmartJobAI help improve my resume?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-sm">
              {`Yes! Our platform offers AI-powered resume analysis that highlights weak points, suggests improvements, and ensures your resume is tailored to the jobs you're applying for.`}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-xl">{`I'm a company — how does SmartJobAI help with hiring?`}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-sm">
              Companies can post job listings, receive AI-matched candidates,
              and use SmartJobAI’s dashboard to manage applications, analyze
              resumes, and schedule interviews efficiently.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-xl">
            Is my data secure with SmartJobAI?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-sm">
              Your privacy is our priority. We use top-grade encryption and
              follow industry best practices to protect your personal and
              professional information.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex items-center justify-center gap-10  w-full lg:w-1/2">
        <div className=" ">
          <h2 className="text-3xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600">
            Explore answers to the most commonly asked questions about
            SmartJobAI — from how our AI matches you with the best jobs and
            companies, to tips on improving your resume, understanding job
            compatibility scores, application tracking, and making the most of
            your personalized dashboard.
          </p>
        </div>

        <Image
          src={FQAImage}
          alt="Google"
          width={800}
          height={800}
          className="w-[300px] "
        />
      </div>
    </div>
  );
};

export default FQA;
