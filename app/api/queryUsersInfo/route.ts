import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { User } from "@/types/user";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const {
      username,
      email,
      sort,
      pageSize = 10,
      current = 1,
    } = await req.json();

    // 构建查询条件
    const where: Prisma.users_infoWhereInput = {};

    if (username) {
      where.username = { contains: username, mode: "insensitive" };
    }

    if (email) {
      where.email = { contains: email, mode: "insensitive" };
    }

    // 构建排序条件
    let orderBy: Prisma.users_infoOrderByWithRelationInput = {};
    if (sort) {
      switch (sort) {
        case "1":
          orderBy.username = "asc";
          break;
        case "2":
          orderBy.username = "desc";
          break;
        case "3":
          orderBy.email = "asc";
          break;
        case "4":
          orderBy.email = "desc";
          break;
        case "5":
          orderBy.created_at = "asc";
          break;
        case "6":
          orderBy.created_at = "desc";
          break;
      }
    }

    // 查询总记录数
    const total = await prisma.users_info.count({ where });

    // 查询用户列表
    const users = await prisma.users_info.findMany({
      where,
      orderBy,
      take: pageSize,
      skip: (current - 1) * pageSize,
      select: {
        user_id: true,
        username: true,
        email: true,
        created_at: true,
      },
    });

    // 格式化日期并将 username 转换为 name
    const userList: User[] = users.map((user) => ({
      ...user,
      name: user.username,
      created_at: user.created_at
        ? user.created_at.toISOString().replace("T", " ").slice(0, 19)
        : "",
    }));

    return NextResponse.json({ userList, total }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
