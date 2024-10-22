import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // 从请求中获取 JWT token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 判断用户是否已认证（是否有有效的 token）
  const isAuth = !!token;

  console.log(isAuth, "isAuth", token); // 添加 token 日志

  // 检查当前请求的路径是否为登录或注册页面
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  // 处理认证页面（登录、注册）的访问逻辑
  if (isAuthPage) {
    // 如果用户已登录但尝试访问登录或注册页面，重定向到仪表板
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // 如果用户未登录，允许访问认证页面
    return null;
  }

  // 处理需要认证的页面访问逻辑
  if (!isAuth) {
    // 如果用户未登录，记录用户当前尝试访问的 URL
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }
    // 重定向到登录页面，并在 URL 中携带原始目标页面信息
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, request.url)
    );
  }

  // 角色权限控制
  // 如果用户尝试访问管理员页面但不具有管理员角色，重定向到仪表板
  if (
    request.nextUrl.pathname.startsWith("/administrator") &&
    token?.role !== "administrator"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 如果用户已认证且不是访问认证页面，允许访问
  return null;
}

// 配置中间件应用的路由
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/administrator/:path*",
    "/login",
    "/register",
  ],
};
