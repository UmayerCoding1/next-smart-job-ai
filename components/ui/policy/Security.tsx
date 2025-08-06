import React from "react";

const Security = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-black/70">03. Security</h2>
      <p>
        Protecting your personal information is a top priority at SmartJobAI. We
        implement strict security measures to safeguard your data.
      </p>

      <div className="mt-10">
        <ul className="list-disc list-inside">
          <li>
            All sensitive data is encrypted during transmission and storage.
          </li>
          <li>
            Access to your personal information is limited to authorized
            personnel only.
          </li>
          <li>
            We regularly monitor and audit our systems for potential
            vulnerabilities.
          </li>
          <li>
            You are encouraged to use strong, unique passwords for your account.
          </li>
          <li>
            If you notice suspicious activity, please report it to our support
            team immediately.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Security;
