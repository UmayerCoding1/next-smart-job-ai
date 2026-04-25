"use client";
import { Phone, Facebook, Linkedin, Twitter, Github, Mail, ArrowRight, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "motion/react";

const Logo = "/assets/logo.png";

const Footer = () => {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith("/dashboard");
  if (isDashboard) {
    return null;
  }
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#82C526]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Newsletter / CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20 border-b border-white/10 mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Ready to land your <br />
              <span className="text-[#82C526]">dream job?</span>
            </h2>
            <p className="text-neutral-400 max-w-md">
              Join 10,000+ professionals getting weekly career advice and top job alerts directly in their inbox.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex-1 outline-none focus:border-[#82C526]/50 transition-colors backdrop-blur-sm"
            />
            <button className="bg-[#82C526] hover:bg-[#93FE9C] text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
              Subscribe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Image
              src={Logo}
              alt="SmartJobAi Logo"
              width={160}
              height={40}
              className="w-32 brightness-0 invert"
            />
            <p className="text-sm text-neutral-400 leading-relaxed max-w-[240px]">
              The next-generation AI platform connecting top talent with industry-leading digital teams worldwide.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com" },
                { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com" },
                { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com" },
                { icon: <Github className="w-5 h-5" />, href: "https://github.com" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#82C526] hover:text-black transition-all duration-300 border border-white/10"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "About Us",
              links: [
                { name: "Our Story", href: "/about-us" },
                { name: "Mission", href: "/mission" },
                { name: "The Team", href: "/team" },
                { name: "Careers", href: "/careers" },
                { name: "Press Kit", href: "/press" },
              ]
            },
            {
              title: "Job Seekers",
              links: [
                { name: "Resume Builder", href: "/resume-builder" },
                { name: "Pro Version", href: "/pro" },
                { name: "Job Alerts", href: "/job-alerts" },
                { name: "Career Advice", href: "/career-advice" },
                { name: "Success Stories", href: "/success-stories" },
              ]
            },
            {
              title: "Recruiters",
              links: [
                { name: "Post a Job", href: "/post-job" },
                { name: "Pricing Plans", href: "/pricing" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "Resume Search", href: "/resume-search" },
                { name: "How it Works", href: "/how-it-works" },
              ]
            },
            {
              title: "Support",
              links: [
                { name: "Help Center", href: "/faq" },
                { name: "Contact Us", href: "/contact" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Feedback", href: "/feedback" },
              ]
            }
          ].map((column, i) => (
            <div key={i} className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#82C526]">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors flex items-center group gap-1"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#82C526]" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support Widget Section */}
        <div className="mt-24 p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#82C526]/10 flex items-center justify-center border border-[#82C526]/20">
              <Phone className="w-6 h-6 text-[#82C526]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">Customer Support</p>
              <h4 className="text-2xl font-bold tracking-tight">+880123456789</h4>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>

          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">Email Inquiry</p>
              <h4 className="text-2xl font-bold tracking-tight">support@smartjobai.com</h4>
            </div>
          </div>

          <button className="w-full md:w-auto bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-8 py-4 transition-all flex items-center justify-center gap-3 font-bold group">
            <MessageSquare className="w-5 h-5 text-[#82C526]" />
            Live Chat
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} SmartJobAi Platform. Crafted with passion.</p>
          <div className="flex gap-8">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
