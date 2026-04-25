'use client';

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Categories = [
  { _id: 1, name: 'Business Management', totaljobs: 3 },
  { _id: 2, name: 'Web Developer', totaljobs: 2 },
  { _id: 3, name: 'Bank Operation', totaljobs: 1 },
  { _id: 4, name: 'Marketing', totaljobs: 1 },
  { _id: 5, name: 'Software & Web Development', totaljobs: 1 },
  { _id: 6, name: 'Creative Design', totaljobs: 3 },
  { _id: 7, name: 'Database Administration (DBA)', totaljobs: 1 },
  { _id: 8, name: 'Graphic Design', totaljobs: 1 },
  { _id: 9, name: 'Business Systems Analyst', totaljobs: 1 },
  { _id: 10, name: 'Electronics Technician', totaljobs: 1 },
  { _id: 11, name: 'Admin', totaljobs: 2 },
  { _id: 12, name: 'Advertising', totaljobs: 1 },
  { _id: 13, name: 'Medicine', totaljobs: 1 },
  { _id: 14, name: 'Accounts, Finance & Financial Services', totaljobs: 1 },
];

const CategoriesGrid = () => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-[2rem] shadow-xl p-8 md:p-10 lg:p-12 mt-24 border border-white/50">
      <h2 className="text-2xl font-bold mb-8 text-neutral-800 flex items-center gap-3">
        <span className="w-2 h-8 bg-[#82C526] rounded-full inline-block"></span>
        Browse Jobs By Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Categories.map((category) => (
          <Link key={category._id} href={`/browse-jobs?category=${category.name}`}>
            <div className="flex items-center justify-between font-bold group p-4 rounded-xl hover:bg-[#82C526]/10 transition-all duration-300 border border-transparent hover:border-[#82C526]/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-white transition-colors">
                  <ChevronRightIcon size={14} className="text-neutral-400 group-hover:text-[#82C526]" />
                </div>
                <span className="text-neutral-700 group-hover:text-black transition-colors">{category.name}</span>
              </div>
              <span className="text-[#82C526] font-black text-xs bg-green-50 px-2 py-1 rounded-md">{category.totaljobs}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
