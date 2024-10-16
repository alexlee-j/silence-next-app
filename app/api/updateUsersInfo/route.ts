import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { id, username, email } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "用户ID是必需的" }, { status: 400 });
    }

    const updatedUser = await prisma.users_info.update({
      where: { user_id: id },
      data: {
        username: username,
        email: email,
      },
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "用户不存在" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "用户信息更新成功", user: updatedUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("更新用户信息时发生错误:", error);
    if (error instanceof Error && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { message: "用户名或邮箱已存在" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "更新失败，请稍后重试" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
