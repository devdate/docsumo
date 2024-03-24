import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "~/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("user-token")?.value;
  // console.log("test");

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));
  // console.log(verifiedToken);

  if (req.nextUrl.pathname.startsWith("/signin") || req.nextUrl.pathname.startsWith("/signup")) {
    if (!verifiedToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (!verifiedToken) {
    // console.log("check");
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/", "/signin", "/signup"],
};
