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
    <div className="bg-gray-100  rounded-md shadow-md p-2 md:p-2 lg:p-6 mt-20">
      <h2 className="text-xl font-semibold mb-4 ">Browse Jobs By</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-5 border-t-2 border-blue-500">
        {Categories.map((category) => (
         <>
          <Link href={`/browse-jobs?category=${category.name}`}>
          <div key={category._id} className="flex items-center font-medium gap-1 text-sm hover:underline cursor-pointer">
            <span className="text-black"><ChevronRightIcon size={13}/></span>
            <span className="hover:text-blue-600">{category.name}</span>
            <span className="text-green-600 font-semibold">({category.totaljobs})</span>
          </div>
          </Link>
         </>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
