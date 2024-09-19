import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { User } from "@/types/user";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      sort,
      pageSize = 10,
      currentPage = 1,
    } = await req.json();

    // 构建动态查询
    let sql =
      "SELECT *, to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as formatted_date FROM users WHERE 1=1";
    let countSql = "SELECT COUNT(*) FROM users WHERE 1=1";
    const queryParams: any[] = [];
    const countParams: any[] = [];

    if (name) {
      sql += " AND name = $1";
      countSql += " AND name = $1";
      queryParams.push(name);
      countParams.push(name);
    }

    if (email) {
      const emailParamIndex = queryParams.length + 1;
      sql += ` AND email = $${emailParamIndex}`;
      countSql += ` AND email = $${emailParamIndex}`;
      queryParams.push(email);
      countParams.push(email);
    }

    if (sort) {
      switch (sort) {
        case "1":
          sql += " ORDER BY name ASC";
          break;
        case "2":
          sql += " ORDER BY name DESC";
          break;
        case "3":
          sql += " ORDER BY email ASC";
          break;
        case "4":
          sql += " ORDER BY email DESC";
          break;
        case "5":
          sql += " ORDER BY created_at ASC";
          break;
        case "6":
          sql += " ORDER BY created_at DESC";
          break;
      }
    }

    // 添加分页
    const offset = (currentPage - 1) * pageSize;
    sql += ` LIMIT $${queryParams.length + 1} OFFSET $${
      queryParams.length + 2
    }`;
    queryParams.push(pageSize, offset);

    // 查询总记录数
    const countResult = await query(countSql, countParams);
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await query(sql, queryParams);

    if (result.rows.length === 0) {
      return NextResponse.json({ userList: [], total }, { status: 200 });
    }

    const userList: User[] = result.rows as unknown as User[];
    console.log(userList, "9999");

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
