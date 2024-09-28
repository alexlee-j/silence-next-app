import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
  let { username, password, password1 } = await req.json();
  if (!username || !password || !password1) {
    return NextResponse.json({
      message: "参数错误",
    });
  }
  //查询数据库，是否已有该用户
  const sql = `SELECT * FROM users_info WHERE username = '${username}'`;
  const result = await query(sql);
  if (result.rowCount > 0) {
    return NextResponse.json({
      message: "用户已存在",
    });
  }
  password = CryptoJS.AES.decrypt(password, "123456").toString(
    CryptoJS.enc.Utf8
  );
  password1 = CryptoJS.AES.decrypt(password1, "123456").toString(
    CryptoJS.enc.Utf8
  );
  console.log(password, password1);

  // 密码校验，密码一致，插入数据库
  if (password === password1) {
    const hash = bcrypt.hashSync(password, 10);
    const sql = `INSERT INTO users_info(username) VALUES('${username}')`;
    const result = await query(sql);
    if (result.rowCount > 0) {
      return NextResponse.json({
        message: "注册成功",
      });
    }
  }
}
