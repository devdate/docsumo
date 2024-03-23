"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/input-pass";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@iconify/react";

const formSchema = z.object({
  email: z.string().email({ message: "Please Enter a Valid Email" }),
  password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
});

const SignIn = () => {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const {
    mutateAsync: login,
    isError,
    error,
  } = api.auth.login.useMutation({
    onSuccess: (token) => {
      //   console.log(token);
      router.push("/");
      //   setName("");
    },
    onSettled: () => {
      setSubmitted(false);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    console.log(values);
    await login(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">Email</FormLabel>
              <FormControl>
                <Input placeholder="example@xyz.com" {...field} className="text-[16px]" />
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
        <Button className="w-full text-xs font-normal tracking-widest" type="submit">
          {submitted && <Icon className="mr-2 h-4 w-4 animate-spin" icon="ei:spinner-3" />}LOGIN
        </Button>
      </form>
    </Form>
  );
};

export default SignIn;
