"use client";

import { MoveLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ExpiredPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-4">
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center border border-gray-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-red-500"
          >
            <svg
              className="w-16 h-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-gray-800"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            This Link Has Expired
          </motion.h2>

          <motion.p
            className="text-gray-600"
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            It looks like this job application link is no longer active. Please go back and try again or search for a new job.
          </motion.p>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center mt-6 gap-2 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <MoveLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
