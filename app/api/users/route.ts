import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { User } from "@/types/user";

export async function POST(req: NextRequest) {
  try {
    const { name, email, sort } = await req.json();

    // 构建动态查询
    let sql =
      "SELECT *,to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as formatted_date FROM users WHERE 1=1";
    const queryParams: any[] = [];

    if (name) {
      sql += " AND name = $1";
      queryParams.push(name);
    }

    if (email) {
      sql += queryParams.length > 0 ? " AND email = $2" : " AND email = $1";
      queryParams.push(email);
    }

    if (sort && sort === "asc") {
      sql += " ORDER BY created_at ASC";
    } else {
      // 按照创建时间排序
      sql += " ORDER BY created_at DESC";
    }

    const result = await query(sql, queryParams);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const users: User[] = result.rows as unknown as User[];
    console.log(users, "9999");

    return NextResponse.json(users, { status: 200 });
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
