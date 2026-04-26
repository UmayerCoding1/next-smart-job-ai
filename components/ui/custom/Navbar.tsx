"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../button';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import GostButton from '@/components/button/GostButton';
import { Bell, LayoutDashboard, Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../sheet';
import NavlinkList from './NavlinkList';

export const LargeLogo = "/assets/logo.png";
export const SmallLogo = "/assets/Ai.png";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.authR.user);
  const navlist = [
    { name: "Home", href: "/" },
    { name: "Find Jobs", href: "/browse-jobs" },
    { name: "Pricing Plan", href: "/pricing" },
    { name: "Customer Support", href: "/support" },
    { name: "About", href: "/about" },
    { name: "Policy", href: "/policy" },

  ];
  return (
    <header className={`${pathname === '/' && 'lg:absolute'} lg:top-0 lg:left-0 lg:right-0 lg:z-20 max-w-7xl mx-auto p-2 lg:p-2 w-full  `}>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center lg:gap-16'>
          <section>
            <Link href="/">
              <Image
                src={LargeLogo}
                alt="logo"
                width={150}
                height={150}
                className="lg:block md:block hidden"
              />
            </Link>
            <Image
              src={SmallLogo}
              alt="logo"
              width={150}
              height={150}
              className="lg:hidden md:hidden block w-[45px]"
            />
          </section>

          <div>
            <ul className='lg:flex items-center justify-between gap-2 lg:gap-7 hidden'>
              {navlist.map((item) => (
                <Link
                  href={item?.href || "#"}
                  key={item?.name}
                  className={`text-[13px] lg:text-sm font-medium  hover:text-blue-600  transition-all duration-300 ease-in-out flex items-center justify-center h-10 `}
                >
                  {item?.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {user ? <section className="flex items-center gap-2">
          <GostButton >
            <Search size={30} />
          </GostButton>

          <div className="relative ">
            <GostButton>
              <Bell size={30} />
            </GostButton>

            <span className="absolute -top-2 right-0 w-5 h-5 flex items-center font-medium justify-center bg-blue-300 text-sm rounded-full  ">
              5
            </span>
          </div>

          <div>
            <Link href={`/dashboard/${user?.role}`}>
              <Button className="cursor-pointer">
                <LayoutDashboard size={30} />
                Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex items-center bg-gray-100  rounded-2xl cursor-pointer">
            <Sheet>
              <SheetTrigger asChild>
                <button className="cursor-pointer">
                  <Menu size={30} />
                </button>
              </SheetTrigger>

              <SheetContent>
                <NavlinkList />
              </SheetContent>
            </Sheet>
          </div>
        </section>
          :
          <div className='flex items-center gap-2'>
            <Button onClick={() => router.push('/login')} variant={'ghost'} className='hover:bg-transparent cursor-pointer hover:text-black'>Login</Button>
            <Button onClick={() => router.push('/register')} className='bg-white text-black shadow-md hover:bg-white/70 cursor-pointer'>Register</Button>
          </div>
        }
      </nav>
    </header >
  )
}
