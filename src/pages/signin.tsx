import { Button } from "~/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SignIn from "~/components/SingIn";

const page = () => {
  return (
    <div>
      <Card className="mx-auto mt-10 max-w-xl rounded-2xl dark:bg-neutral-900">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-[32px]">Login</CardTitle>
          <CardTitle className="pt-6 text-[24px] font-medium">Welcome back to Docsumo</CardTitle>
          <CardTitle className="pt-2 text-[16px] font-normal">The next gen business marketplace</CardTitle>
        </CardHeader>
        <CardContent className="md:px-16">
          <SignIn />
          <hr className="my-6 h-0.5 border-t-0 bg-gray-200 dark:bg-white/10" />
          <div className="w-full text-center">
            <span className="text-[16px] font-normal">Don’t have an Account? </span>
            &nbsp;
            <Link className="text-[16px] font-medium" href={"/signup"}>
              SIGN UP
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
