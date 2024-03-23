"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icon } from "@iconify/react";

import { CardTitle, CardHeader, CardContent, Card } from "./ui/card";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/input-pass";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { InputOTP, InputOTPSlot } from "./ui/input-otp";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const EmailMask = /(?<=.{3}).(?=[^@]*?@)/gm;

const formSchema = z
  .object({
    name: z.string().min(3, { message: "Please Enter atleast 3 letters" }),
    email: z.string().email({ message: "Please Enter a Valid Email" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be atleast 8 characters" }),
  })
  .superRefine(({ password, confirmPassword }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecialChar < 1 || countOfNumbers < 1) {
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password does not meet complexity requirements",
      });
    }
    if (password !== confirmPassword) {
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

const SignUp = () => {
  const router = useRouter();
  const {
    mutate: signup,
    isError,
    error,
  } = api.auth.signup.useMutation({
    onSuccess: (token) => {
      setVerify(true);
    },
    onSettled: () => {
      setSubmitted(false);
    },
  });
  const {
    mutate: otpverify,
    isError: isOTPError,
    error: otpError,
  } = api.auth.otpverify.useMutation({
    onSuccess: async () => {
      alert("Signed Up Successfully");
      await router.push("/signin");
    },
    onSettled: () => {
      setSubmitted(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [OtpValue, setOtpValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [verify, setVerify] = useState(false);
  const otpSubmit = () => {
    setSubmitted(true);
    otpverify({ otp: OtpValue });
    console.log(OtpValue);
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    signup(values);
    console.log(values);
  }
  return (
    <Card className="mx-auto mt-6 max-w-xl rounded-2xl dark:bg-neutral-900">
      <CardHeader className="items-center space-y-1 text-center">
        <CardTitle className="text-[32px] font-bold">{verify ? "Verify your email" : "Create your account"}</CardTitle>
        {verify && (
          <CardTitle className="w-3/4 pt-[32px] text-center">{`Enter the 8 digit code you have received on ${form
            .getValues("email")
            .replaceAll(EmailMask, "*")}`}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="md:px-16">
        {!verify && (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16px]">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Sam" className="text-[16px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16px]">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@xyz.com" className="text-[16px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16px]">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <PasswordInput {...field} className="text-[16px]" />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Min 8 characters containing atleast 1 Uppercase, 1 Lowercase, 1 Number and 1 Special character
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16px]">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <PasswordInput {...field} className="text-[16px]" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isError && (
                  <div className="w-full text-center">
                    <span className="mb-8 text-lg font-semibold text-red-500">
                      {/* {error.data.zodError.fieldErrors.title} */}
                      {/* {JSON.stringify(error)} */}
                      {error.shape?.message}
                    </span>
                  </div>
                )}
                <Button disabled={submitted} className="w-full text-xs font-normal tracking-widest" type="submit">
                  {submitted && <Icon className="mr-2 h-4 w-4 animate-spin" icon="ei:spinner-3" />}
                  CREATE ACCOUNT
                </Button>
              </form>
            </Form>
            <hr className="my-6 h-0.5 border-t-0 bg-gray-200 dark:bg-white/10" />
            <div className="w-full text-center">
              <small>Have an Account? </small>&nbsp;
              <Link className="text-sm font-semibold" href={"/signin"}>
                LOGIN
              </Link>
            </div>
          </>
        )}
        {verify && (
          <>
            <small className="pl-0 sm:pl-20 md:pl-8 text-sm font-medium leading-none">Code</small>
            <InputOTP maxLength={8} value={OtpValue} onChange={(value) => setOtpValue(value)}>
              {Array.from({ length: 8 }, (_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTP>
            {isOTPError && (
              <div className="w-full text-center mt-4">
                <span className="mb-8 text-lg font-semibold text-red-500">
                  {/* {error.data.zodError.fieldErrors.title} */}
                  {/* {JSON.stringify(error)} */}
                  {otpError.shape?.message}
                </span>
              </div>
            )}
            <Button
              disabled={submitted}
              className="mb-[60px] mt-[64px] w-full text-xs font-normal tracking-widest"
              type="button"
              onClick={otpSubmit}
            >
              {submitted && <Icon className="mr-2 h-4 w-4 animate-spin" icon="ei:spinner-3" />}
              VERIFY
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SignUp;
