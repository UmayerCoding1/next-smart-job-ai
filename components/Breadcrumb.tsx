"use client";
import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


type Props = {
  link?: { href: string; label: string }[];
  currentPage: string;
};
const Breadcrumbs = ({ link, currentPage }: Props) => {
  console.log(link);
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

export default Breadcrumbs;
