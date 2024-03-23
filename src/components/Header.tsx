import React from "react";
import DarkToggle from "./DarkToggle";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/next.svg";

const Header = () => {
  return (
    <nav className="border-gray-200 bg-white dark:bg-neutral-900">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between p-4">
        <Link href="" className="flex items-center space-x-3 text-gray-800  dark:text-white rtl:space-x-reverse">
          <Image style={{ width: "100%" }} src={Logo} className="h-8 text-gray-800 dark:text-white" alt="NextJS Logo" />
        </Link>
        <div className="flex items-center">
          <ul className="mt-0 hidden flex-row space-x-8 text-sm font-medium md:flex rtl:space-x-reverse">
            {["Categories", "Sale", "Clearance", "New Stock", "Trending"].map((eachCategory, i) => (
              <li key={i}>
                <Link
                  href="#"
                  className="text-[16px] font-semibold text-gray-900 hover:underline dark:text-white"
                  aria-current="page"
                >
                  {eachCategory}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-9 rtl:space-x-reverse">
          <DarkToggle />
          <svg
            className="h-6 w-6 cursor-pointer text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>

          <svg
            className="h-6 w-6 cursor-pointer text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Header;
