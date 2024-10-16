import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({
      message: "参数错误",
    });
  }
  try {
    const result = await prisma.users_info.update({
      where: {
        user_id: id,
      },
      data: {
        is_deleted: "1",
      },
    });
    return NextResponse.json({
      body: result,
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
}
