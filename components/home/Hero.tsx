"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { CheckCircle2, Zap, Star } from "lucide-react";
import { motion, AnimatePresence } from 'motion/react';

const cardInfo = [
  {
    id: 1,
    avatar: '/assets/avatar1.webp',
    name: 'Bardor Rofces',
    location: 'Beriln, Germany',
    jobTitle: 'Product Designer',
    jobType: 'Full-time',
    companyImage: '/assets/clogo1.jpg',

  },
  {
    id: 2,
    avatar: '/assets/avatar2.webp',
    name: 'Bardor Rofces',
    location: 'Beriln, Germany',
    jobTitle: 'Product Designer',
    jobType: 'Full-time',
    companyImage: '/assets/clogo1.jpg',

  },
  {
    id: 3,
    avatar: '/assets/avatar3.webp',
    name: 'Bardor Rofces',
    location: 'Beriln, Germany',
    jobTitle: 'Product Designer',
    jobType: 'Full-time',
    companyImage: '/assets/clogo1.jpg',

  },
  {
    id: 4,
    avatar: '/assets/avatar1.webp',
    name: 'Bardor Rofces',
    location: 'Beriln, Germany',
    jobTitle: 'Product Designer',
    jobType: 'Full-time',
    companyImage: '/assets/clogo1.jpg',

  }
]

const Hero = () => {
  const [cards, setCards] = useState(cardInfo)

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev]
        const first = newArr.shift()
        newArr.push(first!)
        return newArr
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])




  return (
    <div className="w-full h-auto   z-10 flex lg:items-center justify-between relative  ">
      <div className=" w-full h-[600px]  lg:flex items-center  bg-linear-to-r from-[#fff] via-[#fff] to-[#f8fff0]  px-2 md:px-5 lg:px-20 py-4">
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-black"></span>
            <p className="text-sm lg:text-lg uppercase tracking-wide  font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#82C526] to-[#5c940d]">find your dream job</p>
          </div>
          <div>
            <h1 className="hidden md:block text-5xl font-medium font-playfair lg:text-7xl lg:leading-tight leading-none text-balance">Remote work <br /> platform for <br /> digital teams</h1>
            <h1 className="md:hidden text-5xl font-medium font-playfair lg:text-7xl lg:leading-tight leading-none text-balance">Remote work for digital teams</h1>
            <p className="text-neutral-600 font-medium max-w-lg mt-4">A skills assessment platform that gives hiring teams incredible insight into candidates&apos; job-specific skills. So you find and shortlist quality talent, real fast!</p>
          </div>


          {/* search bar */}
          <div className="lg:w-[450px] w-full ">
            <div className="bg-white px-2 py-4  grid lg:grid-cols-3 items-center gap-10 rounded-lg shadow-md">
              <div className="border-r">
                <h3 className="xl font-semibold">Job Title</h3>
                <input type="text" className="border-none outline-none w-[150px] text-sm" placeholder="Search for job" />
              </div>
              <div>
                <h3>Location</h3>
                <input type="text" className="border-none outline-none w-[150px] text-sm" placeholder="Search for location" />
              </div>
              <div>
                <Button className="bg-[#93FE9C] text-black  lg:font-medium  w-full  lg:h-10 h-12 lg:py-7 py-4 hover:bg-[#57ef63]">Find a Job</Button>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2 mt-4 ml-3'>
            <div className='flex'>
              {['/assets/avatar1.webp', '/assets/avatar2.webp', '/assets/avatar3.webp'].map((url, i) => (
                <div key={i} className='-ml-4'>
                  <Image
                    src={url} alt="Hero"
                    width={100}
                    height={100}
                    className='rounded-full border-white border-2 border-solid  w-10 h-10 ' />
                </div>
              ))}


            </div>
            <div>
              <p className="font-medium">Booked by over <br className="hidden lg:block" /> 10,000+ people</p>
            </div>
          </div>
        </section >
      </div >



      {/*  */}
      < div className="relative w-full h-[600px] overflow-hidden bg-[#f8fff0] hidden lg:block" >

        {/* Glow 1 */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-300 opacity-30 blur-[120px] rounded-full" ></div >

        {/* Glow 2 */}
        <div className="absolute bottom-0 left-40 w-[500px] h-[500px] bg-[#D7FCDB] opacity-30 blur-[120px] rounded-full" ></div >
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-300 opacity-30 blur-[120px] rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="w-[320px] h-[360px] relative bg-white/40 backdrop-blur-2xl rounded-2xl p-5 overflow-hidden">

            <AnimatePresence>
              {cards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: 1 - i * 0.2,
                    y: i * 80,
                    scale: 1 - i * 0.08,
                    filter: `blur(${i * 1}px)`,
                    zIndex: 10 - i,
                  }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 15
                  }}
                  className="absolute w-full bg-white/80 backdrop-blur-xl rounded-xl shadow-md px-3 py-3"
                >

                  <div className="flex gap-2">
                    <Image src={card.avatar} alt="avatar" width={40} height={40} className="rounded-full" />

                    <div className="flex justify-between flex-1 items-center">
                      <div>
                        <h2 className="text-sm font-medium">{card.name}</h2>
                        <p className="text-xs text-neutral-500">{card.location}</p>
                      </div>

                      <Image src={card.companyImage} alt="logo" width={30} height={30} className="rounded-full mr-3" />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-2 text-xs text-neutral-500">
                    <p>{card.jobTitle}</p>
                    <p>{card.jobType}</p>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

          </div>

          {/* Easy Apply Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: "50%" }}
            animate={{ opacity: 1, x: 0, y: "50%" }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-[180px] bg-white/90 backdrop-blur-xl absolute top-[45%] -left-10 md:left-16 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 z-20 hidden md:block"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-600 fill-green-600" />
              </div>
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Easy Apply</span>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-neutral-800">Software Engineer</h4>
                <p className="text-[10px] text-neutral-500">Google Inc.</p>
              </div>

              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-neutral-200 overflow-hidden relative">
                    <Image src={`/assets/avatar${i}.webp`} alt="user" fill className="object-cover" />
                  </div>
                ))}
                <div className="w-5 h-5 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[8px] font-bold text-green-600">
                  +12
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-bold">4.9</span>
                </div>
                <div className="flex items-center gap-1 text-green-500">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-[10px] font-medium">Applied</span>
                </div>
              </div>
            </div>

            {/* Decorative progress bar */}
            <div className="absolute -bottom-1 left-4 right-4 h-1 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                className="h-full bg-green-500"
              />
            </div>
          </motion.div>

          {/* Additional Floating Element for visual balance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -top-10 -right-10 w-24 h-24 bg-[#93FE9C]/20 blur-2xl rounded-full"
          />

        </div>

      </div >
    </div >
  );
};

export default Hero;
