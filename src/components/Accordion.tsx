"use client";
import { useState, useEffect, useRef } from "react";
import Arrow from "@/assests/arrow.svg";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  active = false,
  onClick,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(active);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(active);
  }, [active]);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
    if (onClick) onClick();
  };

  return (
    <div className="w-full">
      <button
        className={`w-full px-4 py-2 flex   items-center hover:bg-gray-300 rounded-r-3xl focus:outline-none transition-colors duration-300 ${
          isOpen
            ? "text-[#EE232F] rounded-r-3xl bg-[#F9EAEB] border-l-4 border-[#EC232B]"
            : "text-gray-700"
        }`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-4 justify-center w-full">
          {icon}
          <span className="">{title}</span>
        </div>
        <span
          className={`absolute right-4 transition-transform duration-300 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        >
          <Arrow
            className={` ${isOpen ? "stroke-[#EC232B]" : "stroke-gray-700"}`}
          />
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px ` : "0px",
        }}
        className={`${isOpen ? "mt-3" : ""} w-full flex flex-col gap-2 transition-all duration-300 overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
