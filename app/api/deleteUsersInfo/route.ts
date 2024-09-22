import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({
      message: "参数错误",
    });
  }
  try {
    const sql = `UPDATE users SET is_deleted = 1 WHERE id = ${id}`;
    let result = await query(sql);
    console.log(result, "0000000000");

    return NextResponse.json({
      body: result.rows[0],
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
}
