"use client";
import React from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import Security from "./Security";
import Limitations from "./Limitation";
import TermsCondition from "./TermsCondition";


export const ListOfPolicy = [
    {id: 1, title: 'Terms and Conditions', value: 'terms-and-conditions'},
    {id: 2, title: 'Limitations', value: 'limitations'},
    {id: 3, title: 'Security', value: 'security'},
    {id: 1, title: 'Privacy Policy', value: 'privacy-policy'},
]

const PolicyPage = () => {
    const [showContent, setShowContent] = React.useState<string>('terms-and-conditions');
  return (
    <div className="flex gap-5  flex-col-reverse  lg:flex-row">
      <div className="flex-1">
        {showContent === 'terms-and-conditions' && <TermsCondition/>}
        {showContent === 'limitations' && <Limitations/>}
        {showContent === 'security' && <Security/>}
        {showContent === 'privacy-policy' && <PrivacyPolicy/>}
       
      </div>

      <div className="border-l pl-2 h-[130px] ">
        <h2 className="text-lg text-gray-400 font-semibold">TABLE OF CONTENTS</h2>
        <ul>
            {ListOfPolicy.map((policy,idx) => (
                <li key={policy.id} className={`text-sm font-medium py-2 cursor-pointer ${showContent === policy.value ? 'text-blue-600' : ''}`} onClick={() => setShowContent(policy.value)}>0{idx + 1}. {policy.title}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PolicyPage;
