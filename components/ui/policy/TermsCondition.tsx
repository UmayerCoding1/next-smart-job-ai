import React from "react";

const TermsCondition = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-black/70 mb-2">
        01. Terms and Conditions.
      </h2>

      <div>
        <p>
          Welcome to SmartJobAI. By accessing and using our platform, you agree to comply with the following terms. Please read them carefully before proceeding.
        </p>

        <div className="mt-10 flex flex-col gap-10">
          <div>
            <h2 className="text-2xl font-medium text-black/70">
              1. Acceptance of Terms
            </h2>

            <p>By accessing or using SmartJobAI, you agree to be bound by these Terms. If you do not agree, you must not use our services.</p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black/70">
             2. User Eligibility
            </h2>

             <ul>
                <li>- You must be at least 16 years old to create an account.</li>
                <li>- You are responsible for providing accurate, complete, and up-to-date information.</li>
             </ul>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black/70">
             3. Account Security
            </h2>

             <ul>
                <li>-  You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>- You agree to notify us immediately of any unauthorized use of your account.</li>
             </ul>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black/70">
            4. Changes to Terms
            </h2>

             <p>We may update these Terms at any time. Continued use after such changes indicates your acceptance.</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default TermsCondition;
