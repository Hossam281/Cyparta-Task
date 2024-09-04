// components/SideBar.tsx
"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Login from "@/assests/login.svg";
import Profile from "@/assests/profile.svg";
import Image from "next/image";
import Logo from "@/assests/logo.png";
import Accordion from "@/components/Accordion";
import Employees from "@/assests/employees.svg";
import Date from "@/assests/date.svg";
import Payroll from "@/assests/payroll.svg";
import Task from "@/assests/task.svg";

const SideBar: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const pathname = usePathname();

  // Update activeLink based on current pathname
  useEffect(() => {
    if (pathname) {
      if (pathname.includes('/employees/profile')) {
        setActiveLink('profile');
      } else if (pathname==='/') {
        setActiveLink('/');
      } else if (pathname.includes('/attendance')) {
        setActiveLink('attendance');
      } else if (pathname.includes('/tasks')) {
        setActiveLink('tasks');
      } else if (pathname.includes('/payroll')) {
        setActiveLink('payroll');
      }
    }
  }, [pathname]);

  const toggleAccordion = (section: string) => {
    setActiveAccordion((prev) => (prev === section ? null : section));
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, linkType: string) => {
    // Prevent navigation for dummy links
    if (linkType !== "profile" && linkType !== "/") {
      event.preventDefault();
    }
    setActiveLink(linkType);
  };

  return (
    <div className="w-[20%] h-[90%] font-semibold border border-gray-100 shadow-md z-30 fixed top-1/2 left-6 transform -translate-y-1/2 rounded-3xl">
      <div className="flex flex-col gap-4 items-center mt-[10%]">
        <Image className=" mb-6" src={Logo} alt="logo" width={200} height={158} />

        <Accordion
          title="Employees"
          icon={
            <Employees
              className={`w-6 h-6 ${
                activeAccordion === "menu" ? "fill-[#EC232B]" : "fill-gray-700"
              } `}
            />
          }
          active={activeAccordion === "menu"}
          onClick={() => toggleAccordion("menu")}
        >
          <Link
            href="/employees/profile"
            passHref
            onClick={(e) => handleClick(e, "profile")}
            className={`py-2 px-4 w-full rounded-r-3xl cursor-pointer flex hover:bg-gray-300 justify-center gap-2 items-center text-center ${
              activeLink === "profile"
                ? "bg-[#F9EAEB] text-[#EC232B] border-l-4 border-[#EC232B]"
                : ""
            }`}
          >
            <Profile
              className={`w-6 h-6 ${
                activeLink === "profile" ? "fill-[#EC232B]" : "fill-gray-700"
              } `}
            />
            <span className="w-[30%]">Profile</span>
          </Link>
          <Link
            href="/attendance"
            passHref
            onClick={(e) => handleClick(e, "attendance")}
            className={`py-2 px-4 w-full rounded-r-3xl cursor-pointer flex hover:bg-gray-300 justify-center gap-2 items-center text-center ${
              activeLink === "attendance"
                ? "bg-[#F9EAEB] text-[#EC232B] border-l-4 border-[#EC232B]"
                : ""
            }`}
          >
            <Date
              className={`w-6 h-6 fill-none ${
                activeLink === "attendance" ? "stroke-[#EC232B]" : "stroke-gray-700"
              } `}
            />
            <span className="w-[30%]">Attendance</span>
          </Link>
          <Link
            href="/tasks"
            passHref
            onClick={(e) => handleClick(e, "tasks")}
            className={`py-2 px-4 w-full rounded-r-3xl cursor-pointer flex hover:bg-gray-300 justify-center gap-2 items-center text-center ${
              activeLink === "tasks"
                ? "bg-[#F9EAEB] text-[#EC232B] border-l-4 border-[#EC232B]"
                : ""
            }`}
          >
            <Task
              className={`w-6 h-6 ${
                activeLink === "tasks" ? "stroke-[#EC232B]" : "stroke-gray-700"
              } `}
            />
            <span className="w-[30%]">Tasks</span>
          </Link>
        </Accordion>

        <Link
          href="/"
          passHref
          onClick={(e) => handleClick(e, "/")}
          className={`py-2 px-4 w-full rounded-r-3xl cursor-pointer flex hover:bg-gray-300 justify-center gap-2 items-center text-center ${
            activeLink === "/"
              ? "bg-[#F9EAEB] text-[#EC232B] border-l-4 border-[#EC232B]"
              : ""
          }`}
        >
          <Login
            className={`w-4 h-4 ${
              activeLink === "/" ? "fill-[#EC232B]" : "fill-gray-700"
            }`}
          />
          <span className="w-[30%]">Login</span>
        </Link>
        <Link
          href="/payroll"
          passHref
          onClick={(e) => handleClick(e, "payroll")}
          className={`py-2 px-4 w-full rounded-r-3xl cursor-pointer flex hover:bg-gray-300 justify-center gap-2 items-center text-center ${
            activeLink === "payroll"
              ? "bg-[#F9EAEB] text-[#EC232B] border-l-4 border-[#EC232B]"
              : ""
          }`}
        >
          <Payroll
            className={`w-6 h-6 fill-none ${
              activeLink === "payroll" ? "stroke-[#EC232B]" : "stroke-gray-700"
            }`}
          />
          <span className="w-[30%]">Payroll</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
