import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { User } from "@/types/user";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    console.log(name, email);

    if (!name || !email) {
      return NextResponse.json(
        { message: "Missing name or email" },
        { status: 400 }
      );
    }

    const result = await query(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      [name, email]
    );

    return NextResponse.json(
      { body: { rows: result.rows[0] } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
