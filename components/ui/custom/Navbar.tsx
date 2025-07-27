"use client";
import { Bell, LayoutDashboard, Menu, Search, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// import NavlinkList from "./NavlinkList";
import SearchBar from "./Search";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import NavlinkList from "./NavlinkList";
import GostButton from "@/components/button/GostButton";
import { Button } from "../button";
import { Sheet, SheetTrigger } from "../sheet";

export const LargeLogo = "/assets/logo.png";
export const SmallLogo = "/assets/Ai.png";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.authR.user);
  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
    window.scrollTo(0, 0);
  };

  
  



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpenSearch) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpenSearch]);

 

  return (
    <>
      <header
        className={` py-3 shadow-md fixed top-0 left-0 w-full z-50 ${
          isSticky ? "bg-white backdrop-blur-md" : "bg-transparent"
        } transition-all duration-300 ease-in-out bg-white`}
      >
        <nav className="max-w-7xl mx-auto  px-1 flex items-center justify-between">
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

          {user ? (
            <section className="flex items-center gap-2">
              <GostButton onClick={toggleSearch}>
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
                <Button className="cursor-pointer">
                  <LayoutDashboard size={30} />
                  Dashboard
                </Button>
              </div>

              <div className="flex items-center bg-gray-100  rounded-2xl cursor-pointer">
                <Sheet>
                  <div className="flex items-center gap-2 p-1">
                    <div>
                      <button className="bg-black text-white w-10 h-10 rounded-full cursor-pointer">
                        UH
                      </button>
                    </div>

                    <>
                      <SheetTrigger className="cursor-pointer">
                        <Menu size={30} className="cursor-pointer" />
                      </SheetTrigger>
                    </>

                    <div>
                      <NavlinkList />
                    </div>
                  </div>
                </Sheet>
              </div>
            </section>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                  <span>Login</span>
                  <span>/</span>
                  <span>Register</span>
                </Button>
              </Link>

              <Sheet>
                
                    <SheetTrigger className="cursor-pointer">
                      <Menu size={30} className="cursor-pointer" />
                    </SheetTrigger>
                  

                <div>
                  <NavlinkList  />
                </div>
              </Sheet>
            </div>
          )}
        </nav>
      </header>

      {isOpenSearch && (
        <div className="w-full h-screen bg-white/70 absolute top-0 left-0 z-100 text-white flex items-center justify-center p-2">
          <div className="bg-white text-black w-full lg:w-auto rounded-lg ">
            <SearchBar />
          </div>

          <X
            onClick={toggleSearch}
            size={30}
            className="fixed top-2 right-2 cursor-pointer text-black"
          />
        </div>
      )}

      <div className="h-[65px] md:h-[75px] lg:h-[62px]"></div>
    </>
  );
};

export default Navbar;
