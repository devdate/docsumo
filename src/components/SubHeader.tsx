import React from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Button } from "./ui/button";

const SubHeader = () => {
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
    <nav className="bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-screen-2xl px-4 py-2">
        <div className="flex items-center justify-end">
          <ul className="mt-0 flex flex-row space-x-8 text-sm font-light rtl:space-x-reverse">
            {["Help", "Orders & Returns", router.asPath === "/" ? "Hi User!" : "Hi Guest!"].map((eachOption) => (
              <li key={eachOption}>
                <a href="#" className="text-[12px] font-normal text-gray-800 hover:underline dark:text-white">
                  {eachOption}
                </a>
              </li>
            ))}
            {router.asPath === "/" && (
              <Button variant="link" className="py-0 h-fit font-normal text-[12px]" onClick={() => logout()}>
                Logout
              </Button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SubHeader;
