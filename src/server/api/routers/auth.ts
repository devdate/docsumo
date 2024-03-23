import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "~/lib/auth";
import cookie from "cookie";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx;
      // simulate a slow db call
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      const { email, password } = input;
      if (email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD) {
        //user loggen in
        console.log("User logged in");

        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1d")
          .sign(new TextEncoder().encode(getJwtSecretKey()));

        // cookies().set({
        //   name: "user-token",
        //   value: token,
        //   httpOnly: true,
        //   path: "/",
        //   secure: process.env.NODE_ENV === "production",
        // });
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("user-token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );

        return token;
      }
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid Credentials",
      });
    }),
  logout: publicProcedure.mutation(({ input, ctx }) => {
    const { res } = ctx;

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("user-token", "invalid", {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
      })
    );
  }),
  signup: publicProcedure
    .input(
      z
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
        })
    )
    .mutation(({ input, ctx }) => {
      const { res } = ctx;
      return;
    }),
  otpverify: publicProcedure.input(z.object({ otp: z.string().min(8) })).mutation(({ input, ctx }) => {
    const { otp } = input;
    if (otp === "12345678") {
      return;
    }
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid OTP",
    });
  }),
});
