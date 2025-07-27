"use client";
import React from "react";


import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../breadcrumb";
import Link from "next/link";

type Props = {
  link?: { href: string; label: string }[];
  currentPage: string;
};
const CustomBreadcrumb = ({ link, currentPage }: Props) => {

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {link?.map((link) => (
          <div key={link.href} className="flex items-center ">
            <BreadcrumbItem key={link.href}>
              <BreadcrumbLink asChild>
                <Link href={link.href}>{link.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
