import React from "react";
import DarkToggle from "./DarkToggle";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/docsumo.svg";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Button } from "./ui/button";

const Header = () => {
  const router = useRouter();
  const {
    mutate: logout,
    isError,
    error,
  } = api.auth.logout.useMutation({
    onSuccess: () => {
      //console.log(token);
      router.reload();
    },
  });
  return (
    <nav className="border-gray-200 bg-white dark:bg-neutral-900">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between p-4">
        <Link href="" className="flex items-center space-x-3 text-gray-800  dark:text-white rtl:space-x-reverse">
          <Image
            style={{ width: "100%" }}
            priority
            src={Logo as string}
            className="h-8 text-gray-800 dark:text-white"
            alt="NextJS Logo"
          />
        </Link>
        <div className="flex items-center text-lg font-medium">Review Screen</div>
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
          {router.asPath === "/" && (
            <Button variant="link" className="py-0 h-fit font-normal text-[14px]" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
