'use client';
import { Check } from 'lucide-react';
import React from 'react';


export const recruiterPlans = {
  monthly: [
    {
      title: "Free",
      price: "৳0/month",
      features: [
        "Post up to 1 jobs/month",
        "Basic candidate matching",
        "Limited candidate view",
      ],
    },
    {
      title: "Growth",
      price: "৳999/month",
      features: [
        "Post up to 10 jobs/month",
        "AI-powered candidate matching",
        "Basic analytics dashboard",
        "Download resumes",
      ],
    },
    {
      title: "Professional",
      price: "৳1999/month",
      features: [
        "Unlimited job posts",
        "Advanced AI recommendations",
        "Full analytics dashboard",
        "Candidate filters & insights",
        "Priority customer support",
      ],
    },
  ],
  yearly: [
    {
      title: "Free",
      price: "৳0/year",
      features: [
        "Post up to 1 jobs/month",
        "Basic candidate matching",
        "Limited candidate view",
      ],
    },
    {
      title: "Growth",
      price: "৳9990/year", // ~2 months free
      features: [
        "Post up to 10 jobs/month",
        "AI-powered candidate matching",
        "Basic analytics dashboard",
        "Download resumes",
      ],
    },
    {
      title: "Professional",
      price: "৳19990/year", // ~2 months free
      features: [
        "Unlimited job posts",
        "Advanced AI recommendations",
        "Full analytics dashboard",
        "Candidate filters & insights",
        "Priority customer support",
      ],
    },
  ],
};

const RecruiterPlan = ({isPlanType} : {isPlanType: boolean}) => {
    return (
        <div className='lg:flex items-center justify-evenly gap-10 max-w-7xl mx-auto'>
            {!isPlanType ? recruiterPlans.monthly.map((plan, index) => (
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
                           <span>{plan.title === 'Growth' && '1500 Token'}</span>
                           <span>{plan.title === 'Professional' && '2800 Token'}</span>
                          </li>
                    </ul>

                    <button className='bg-[#2563EB] text-white px-4 py-2 rounded-md'>Get Started</button>
                </div>
            )) : recruiterPlans.yearly.map((plan, index) => (
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
                           <span>{plan.title === 'Professional' && '20000 Token'}</span>
                          </li>
                    </ul>

                    <button className='bg-[#2563EB] text-white px-4 py-2 rounded-md'>Get Started</button>
                </div>
            ))}
        </div>
    );
};

export default RecruiterPlan;