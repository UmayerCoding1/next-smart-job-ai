import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Rating } from "../Rating";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const AvatarImage = "/assets/avatar.avif";
const testimonialsData = [
  {
    _id: 1,
    description:
      "Curabitur elementum mi eget semper sagittis.Maecenas nec tortor eu sem dapibus dignissim. Ut malesuada magna libero, nec maximus eros placerat ac. Nam eu ipsum velit. Suspendisse potenti. Suspendisse porta erat nec nisl tristique, id bibendum nulla porta. Aliquam lacinia metus id sapien dignissim, fermentum consequat.",
    rating: 5,
    user: {
      name: "John Doe 1",
      email: "nL5dA@example.com",
      avatar: AvatarImage,
    },
  },
  {
    _id: 2,
    description:
      "Curabitur elementum mi eget semper sagittis.Maecenas nec tortor eu sem dapibus dignissim. Ut malesuada magna libero, nec maximus eros placerat ac. Nam eu ipsum velit. Suspendisse potenti. Suspendisse porta erat nec nisl tristique, id bibendum nulla porta. Aliquam lacinia metus id sapien dignissim, fermentum consequat.",
    rating: 4,
    user: {
      name: "John Doe 2",
      email: "nL5dA@example.com",
      avatar: AvatarImage,
    },
  },
  {
    _id: 3,
    description:
      "Curabitur elementum mi eget semper sagittis.Maecenas nec tortor eu sem dapibus dignissim. Ut malesuada magna libero, nec maximus eros placerat ac. Nam eu ipsum velit. Suspendisse potenti. Suspendisse porta erat nec nisl tristique, id bibendum nulla porta. Aliquam lacinia metus id sapien dignissim, fermentum consequat.",
    rating: 4.5,
    user: {
      name: "John Doe 3",
      email: "nL5dA@example.com",
      avatar: AvatarImage,
    },
  },
  {
    _id: 1,
    description:
      "Curabitur elementum mi eget semper sagittis.Maecenas nec tortor eu sem dapibus dignissim. Ut malesuada magna libero, nec maximus eros placerat ac. Nam eu ipsum velit. Suspendisse potenti. Suspendisse porta erat nec nisl tristique, id bibendum nulla porta. Aliquam lacinia metus id sapien dignissim, fermentum consequat.",
    rating: 5,
    user: {
      name: "John Doe 4",
      email: "nL5dA@example.com",
      avatar: AvatarImage,
    },
  },
  {
    _id: 2,
    description:
      "Curabitur elementum mi eget semper sagittis.Maecenas nec tortor eu sem dapibus dignissim. Ut malesuada magna libero, nec maximus eros placerat ac. Nam eu ipsum velit. Suspendisse potenti. Suspendisse porta erat nec nisl tristique, id bibendum nulla porta. Aliquam lacinia metus id sapien dignissim, fermentum consequat.",
    rating: 4,
    user: {
      name: "John Doe 5",
      email: "nL5dA@example.com",
      avatar: AvatarImage,
    },
  },
  {
    _id: 3,
    description:
      "Curabitur elementum mi eget semper sagittis.Maecenas nec tortor eu sem dapibus dignissim. Ut malesuada magna libero, nec maximus eros placerat ac. Nam eu ipsum velit. Suspendisse potenti. Suspendisse porta erat nec nisl tristique, id bibendum nulla porta. Aliquam lacinia metus id sapien dignissim, fermentum consequat.",
    rating: 4.5,
    user: {
      name: "John Doe 6",
      email: "nL5dA@example.com",
      avatar: AvatarImage,
    },
  },
];
const Testimonials = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  

  const totalSlide = Math.ceil(testimonialsData.length / itemsPerPage);
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // sm
      } else {
        setItemsPerPage(3); // md & lg
      }
    };

    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const endIndex = startIndex + itemsPerPage;
  const visibleItems = testimonialsData.slice(startIndex, endIndex);

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex >= testimonialsData.length) {
      setStartIndex(0);
    } else {
      setStartIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex < 0) return;
    setStartIndex(prevIndex);
  };
  return (
    <div className="mt-10 md:mt-0 lg:mt-0 p-2 md:p-20 lg:p-20 relative">
      <h2 className="text-4xl font-bold text-center">
        Testimonials That Inspire
      </h2>

      <div className="mt-10">
        <AnimatePresence mode="wait" initial={false}>
          <div className="flex justify-between items-center mb-4 absolute w-full top-1/2 left-1 z-10">
            <button
              onClick={handlePrev}
              className={`p-2 rounded-full bg-blue-500 text-sm font-semibold ${
                startIndex === 0
                  ? "opacity-50 bg-gray-200 cursor-not-allowed"
                  : ""
              }`}
              disabled={startIndex === 0}
            >
              <ChevronLeft />
            </button>

            <button
              onClick={handleNext}
              className="p-2 cursor-pointer rounded-full bg-blue-500 text-white text-sm font-semibold"
            >
              <ChevronRight />
            </button>
          </div>
          <motion.div
            key={startIndex} // triggers animation when index changes
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4"
          >
            {visibleItems.map((item) => (
              <div
                key={item._id + "-" + item.user.name}
                className="bg-white border shadow p-4 text-center rounded-lg"
              >
                <p className="text-left">{item.description}</p>

                <div className="flex items-center justify-between gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.user.avatar}
                      alt={item.user.name}
                      width={100}
                      height={100}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p>{item.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.user.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Rating size={12} value={item.rating} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hidden lg:flex items-center justify-center pt-2">
         {Array.from({ length: totalSlide }).map((_, index) => (
           <div
             key={index}
             className={`w-2 h-2 rounded-full mx-1 ${
               index === startIndex / itemsPerPage
                 ? "bg-blue-500"
                 : "bg-gray-300"
             }`}
           ></div>
         ))}
      </div>
    </div>
  );
};

export default Testimonials;
