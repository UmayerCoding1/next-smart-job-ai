import { SheetContent, SheetDescription, SheetHeader } from "../sheet";
// import { IUser } from "@/app/models/User";
import { RootState } from "@/app/redux/store";

import {
  BriefcaseBusiness,
  ChevronRight,
  FileCheck2,
  FilePenLine,
  HeartHandshake,
  Info,
  Rss,
  Settings,
  Shield,
  User,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button";
import Logout from "../../action/logout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setUser } from "@/app/features/user/userSlice";

const UserImage = "/assets/user.png";

const NavlinkList = () => {
  const user = useSelector((state: RootState) => state.authR.user);
  const firstName = user?.fullname.split(" ")[0];
  const lastName = user?.fullname.split(" ")[1];
  const router = useRouter();
  const dispatch = useDispatch();
  const authenticatedRoutes = [
    { lable: "Profile", link: `/profile/${user?.username}`, icon: User },
    { lable: "My Applications", link: "/my-applications", icon: FileCheck2 },
    { lable: "Resume Builder", link: "/resume-builder", icon: FilePenLine },
    { lable: "Settings", link: "/settings", icon: Settings },
  ];

  const globleRoutes = [
    { lable: "Companys", link: "/companies", icon: BriefcaseBusiness },
    { lable: "Blog", link: "/blog", icon: Rss },
    { lable: "About US", link: "/about-us", icon: Info },
    { lable: "Support", link: "/support", icon: HeartHandshake },
    { lable: "Policy", link: "/policy", icon: Shield },
  ];

  const handleLogOut = async () => {
    try {
      const res = await axios.post("/api/auth/logout", {
        withCredentials: true,
      });

      if (res.data.message) {
        dispatch(setUser(null));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
        <SheetDescription>
          <div>
            {user && (
              <div>
                <div className=" flex flex-col items-center justify-center">
                  {user?.avatar ? (
                    <Image
                      src={user?.avatar || UserImage}
                      alt="avatar"
                      width={100}
                      height={100}
                      className="w-32 h-32 rounded-full"
                    />
                  ) : (
                    <div>
                      <Button className="w-32 h-32 flex items-center gap-0 text-5xl font-bold">
                        <span>{firstName?.charAt(0) || ""}</span>
                        <span>{lastName?.charAt(0) || ""}</span>
                      </Button>
                    </div>
                  )}

                  <div className="text-center mt-3 ">
                    <p className="text-lg text-black font-medium">
                      {user?.fullname}
                    </p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <hr className="mt-3" />

                <div className="mt-3">
                  <ul className="flex flex-col gap-2">
                    {authenticatedRoutes.map((route, inx) => (
                      <Link
                        key={inx}
                        href={route.link}
                        className="cursor-pointer p-2 text-black hover:bg-gray-100 rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center gap-1">
                          {route.icon && <route.icon size={15} />}
                          <span className="text-sm font-medium">
                            {route.lable}
                          </span>
                        </div>

                        <ChevronRight size={15} />
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div>
              {user && <hr className="mt-3" />}

              <div>
                <ul className="flex flex-col gap-2">
                  {globleRoutes.map((route, inx) => (
                    <Link
                      key={inx}
                      href={route.link}
                      className="cursor-pointer p-2 text-black hover:bg-gray-100 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1">
                        {route.icon && <route.icon size={15} />}
                        <span className="text-sm font-medium">
                          {route.lable}
                        </span>
                      </div>

                      <ChevronRight size={15} />
                    </Link>
                  ))}
                </ul>
              </div>

              <hr className="my-4" />

              <div>
                {user ? (
                  
                    <Logout handleLogout={handleLogOut}>Logout</Logout>
                 
                ) : (
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white w-full cursor-pointer">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default NavlinkList;
