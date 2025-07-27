import { Phone, Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = "/assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-[#263238] text-white px-4 py-16 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* About Us */}
          <section>
            <h2 className="text-2xl font-semibold mb-5">About Us</h2>
            <ul className="flex flex-col gap-2">
              <Link href="/about-us" className="text-xl hover:underline">
                About SmartJobAi.com
              </Link>
              <Link href="/mission" className="text-xl hover:underline">
                Our Mission
              </Link>
              <Link href="/team" className="text-xl hover:underline">
                Meet the Team
              </Link>
              <Link href="/careers" className="text-xl hover:underline">
                Careers at SmartJobAi
              </Link>
              <Link href="/blog" className="text-xl hover:underline">
                Blog
              </Link>
              <Link href="/press" className="text-xl hover:underline">
                Press & Media
              </Link>
              <Link href="/terms" className="text-xl hover:underline">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="text-xl hover:underline">
                Privacy Policy
              </Link>
              <Link href="/feedback" className="text-xl hover:underline">
                Feedback
              </Link>
              <Link href="/contact" className="text-xl hover:underline">
                Contact Us
              </Link>
            </ul>
          </section>

          {/* Job Seekers */}
          <section>
            <h2 className="text-2xl font-semibold mb-5">Job Seekers</h2>
            <ul className="flex flex-col gap-2">
              <Link href="/resume-builder" className="text-xl hover:underline">
                Resume Builder
              </Link>
              <Link href="/pro" className="text-xl hover:underline">
                SmartJobAi Pro
              </Link>
              <Link href="/faq" className="text-xl hover:underline">
                FAQ
              </Link>
              <Link href="/career-advice" className="text-xl hover:underline">
                Career Advice
              </Link>
              <Link href="/saved-jobs" className="text-xl hover:underline">
                Saved Jobs
              </Link>
              <Link href="/applied-jobs" className="text-xl hover:underline">
                Applied Jobs
              </Link>
              <Link href="/job-alerts" className="text-xl hover:underline">
                Job Alerts
              </Link>
              <Link href="/interview-tips" className="text-xl hover:underline">
                Interview Prep Tools
              </Link>
              <Link href="/success-stories" className="text-xl hover:underline">
                Success Stories
              </Link>
            </ul>
          </section>

          {/* Recruiters */}
          <section>
            <h2 className="text-2xl font-semibold mb-5">Recruiters</h2>
            <ul className="flex flex-col gap-2">
              <Link href="/register" className="text-xl hover:underline">
                Create Account
              </Link>
              <Link href="/services" className="text-xl hover:underline">
                Products/Services
              </Link>
              <Link href="/post-job" className="text-xl hover:underline">
                Post a Job
              </Link>
              <Link href="/pricing" className="text-xl hover:underline">
                Pricing Plans
              </Link>
              <Link href="/dashboard" className="text-xl hover:underline">
                Recruiter Dashboard
              </Link>
              <Link href="/resume-search" className="text-xl hover:underline">
                Resume Search
              </Link>
              <Link href="/how-it-works" className="text-xl hover:underline">
                How It Works
              </Link>
              <Link href="/client-testimonials" className="text-xl hover:underline">
                Client Testimonials
              </Link>
              <Link href="/request-demo" className="text-xl hover:underline">
                Request a Demo
              </Link>
              <Link href="/feedback" className="text-xl hover:underline">
                Feedback
              </Link>
              <Link href="/faq" className="text-xl hover:underline">
                FAQ
              </Link>
            </ul>
          </section>

          {/* Connect with Us */}
          <section>
            <h2 className="text-2xl font-semibold mb-5">Connect with Us</h2>
            <ul className="flex flex-col gap-3">
              <Link
                href="https://facebook.com"
                className="flex items-center gap-2 text-xl hover:underline"
                target="_blank"
              >
                <Facebook size={20} /> Facebook
              </Link>
              <Link
                href="https://linkedin.com"
                className="flex items-center gap-2 text-xl hover:underline"
                target="_blank"
              >
                <Linkedin size={20} /> LinkedIn
              </Link>
              <Link
                href="https://twitter.com"
                className="flex items-center gap-2 text-xl hover:underline"
                target="_blank"
              >
                <Twitter size={20} /> Twitter
              </Link>
            </ul>
          </section>
        </div>

        {/* Support and Logo */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl flex items-center justify-center md:justify-start gap-2">
              Need any support? Call
              <span className="flex items-center gap-2 font-bold text-3xl text-blue-500">
                <Phone /> +880123456789, +880123456789
              </span>
            </h2>
            <p className="text-sm mt-2">
              Our Contact Centre is available from 9 am to 7 pm (Saturday to Thursday).
            </p>
          </div>
          <Image
            src={Logo}
            alt="SmartJobAi Logo"
            width={800}
            height={800}
            className="w-40 md:w-60"
          />
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-6 text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} SmartJobAi.com. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
