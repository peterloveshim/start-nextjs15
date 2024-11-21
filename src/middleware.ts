import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ACCESS_TOKEN, paths, USER_INFO } from "./static";

import { decrypt } from "./lib/session";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  //console.log("pathname : ", pathname);
  //console.log("searchParams : ", searchParams);

  const accessToken = request.cookies.get(ACCESS_TOKEN);
  const userInfo = await decrypt(request.cookies.get(USER_INFO)?.value);

  const isPrivate = !!userInfo;

  if (isPrivate) {
    // 로그인 상태 + 로그인 화면 이동 => 대시보드로 리다이렉트
    if (pathname.startsWith(paths.auth.signIn)) {
      const redirectUrl = `${paths.dashboard}/`;
      return NextResponse.redirect(new URL(redirectUrl, request.nextUrl));
    }
  } else {
    // 로그아웃 상태 + 인증이 필요한 페이지 이동 => 홈으로 리다이렉트
    if (
      pathname.startsWith(paths.dashboard) ||
      pathname.startsWith(paths.room.root) ||
      pathname.startsWith(paths.site.root) ||
      pathname.startsWith(paths.contract.root) ||
      pathname.startsWith(paths.account)
    ) {
      const redirectUrl = `${paths.home}`;
      return NextResponse.redirect(new URL(redirectUrl, request.nextUrl));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
