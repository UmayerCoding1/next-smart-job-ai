'use client';
import { Check } from 'lucide-react';
import React from 'react';

export const jobseekerPlans = {
  monthly: [
    {
      title: "Free",
      price: "৳0/month",
      features: [
        "Apply up to 5 jobs/month",
        "Basic resume score",
        "Limited support",
      ],
    },
    {
      title: "Growth",
      price: "৳499/month",
      features: [
        "Unlimited job applications",
        "AI-powered resume feedback",
        "Job alerts",
      ],
    },
    {
      title: "Professional",
      price: "৳999/month",
      features: [
        "Everything in Growth",
        "Mock interviews with AI",
        "Smart job matching",
        "Priority support",
      ],
    },
  ],
  yearly: [
    {
      title: "Free",
      price: "৳0/year",
      features: [
        "Apply up to 2 jobs/month",
        "Basic resume score",
        "Limited support",
      ],
    },
    {
      title: "Growth",
      price: "৳4990/year",
      features: [
        "Unlimited job applications",
        "AI-powered resume feedback",
        "Job alerts",
      ],
    },
    {
      title: "Professional",
      price: "৳9990/year",
      features: [
        "Everything in Growth",
        "Mock interviews with AI",
        "Smart job matching",
        "Priority support",
      ],
    },
  ],
};

const JobseekerPlan = ({isPlanType} : {isPlanType: boolean}) => {
    console.log(isPlanType);
    console.log(jobseekerPlans.monthly);
    return (
        <div className='lg:flex items-center justify-evenly gap-10 max-w-7xl mx-auto'>
            {!isPlanType ? jobseekerPlans.monthly.map((plan, index) => (
                <div key={index} className={` w-full p-4 rounded-md mb-4 text-center ${plan.title === 'Growth' ? "bg-black text-white h-[350px] shadow-2xl" : 'bg-white h-[320px]'} flex flex-col justify-between relative` }>
                    {plan.title === 'Growth' && <span className='absolute top-0 right-0 bg-blue-500 text-white py-1 px-2 rounded-t-md w-full'>Most Popular</span>}
                     <div  className={`flex flex-col gap-2  ${plan.title === 'Growth' && 'mt-5'}`}>
                        <h3 className=" font-semibold text-2xl">{plan.title}</h3>
                    <p className="text-4xl font-bold">{plan.price}</p>
                     </div>
                    <ul className=" text-left list-inside mt-2 flex flex-col gap-4">
                        {plan.features.map((feature, index) => (
                            <li key={index} className='flex items-center gap-2 '> <Check size={10} className={`${plan.title === 'Growth' ? 'text-blue-500' : 'text-emerald-500'}`}/>{feature}</li>
                        ))}
                          <li className='flex items-center gap-2 '> <Check size={10} className={`${plan.title === 'Growth' ? 'text-blue-500' : 'text-emerald-500'}`}/>
                           <span>{plan.title === 'Free' && '200 Token'}</span>
                           <span>{plan.title === 'Growth' && '1000 Token'}</span>
                           <span>{plan.title === 'Professional' && '1800 Token'}</span>
                          </li>
                    </ul>

                    <button className='bg-[#2563EB] text-white px-4 py-2 rounded-md'>Get Started</button>
                </div>
            )) : jobseekerPlans.yearly.map((plan, index) => (
                <div key={index} className={` w-full p-4 rounded-md mb-4 text-center ${plan.title === 'Growth' ? "bg-black text-white h-[350px] shadow-2xl" : 'bg-white h-[320px]'} flex flex-col justify-between relative` }>
                    {plan.title === 'Growth' && <span className='absolute top-0 right-0 bg-blue-500 text-white py-1 px-2 rounded-t-md w-full'>Most Popular</span>}
                     <div  className={`flex flex-col gap-2  ${plan.title === 'Growth' && 'mt-5'}`}>
                        <h3 className=" font-semibold text-2xl">{plan.title}</h3>
                    <p className="text-4xl font-bold">{plan.price}</p>
                     </div>
                    <ul className=" text-left list-inside mt-2 flex flex-col gap-4">
                        {plan.features.map((feature, index) => (
                            <li key={index} className='flex items-center gap-2 '> <Check size={10} className={`${plan.title === 'Growth' ? 'text-blue-500' : 'text-emerald-500'}`}/>{feature}</li>
                        ))}
                          <li className='flex items-center gap-2 '> <Check size={10} className={`${plan.title === 'Growth' ? 'text-blue-500' : 'text-emerald-500'}`}/>
                           <span>{plan.title === 'Free' && '200 Token'}</span>
                           <span>{plan.title === 'Growth' && '5000 Token'}</span>
                           <span>{plan.title === 'Professional' && '15000 Token'}</span>
                          </li>
                    </ul>

                    <button className='bg-[#2563EB] text-white px-4 py-2 rounded-md'>Get Started</button>
                </div>
            ))}
        </div>
    );
};

export default JobseekerPlan;