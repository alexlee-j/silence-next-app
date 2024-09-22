import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function POST(req: NextRequest) {
  const { id, name, email } = await req.json();
  try {
    let sql = `UPDATE USERS SET name = $1, email = $2 WHERE id = $3 RETURNING *`;
    if (!name && !email) {
      return NextResponse.json({
        message: "Please provide at least one field to update",
      });
    }
    const result = await query(sql, [name, email, id]);
    return NextResponse.json({
      body: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
