import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  let { username, password, password1 } = await req.json();

  // 参数验证
  if (!username || !password || !password1) {
    return NextResponse.json({ message: "参数错误" }, { status: 400 });
  }

  // 解密并比较密码
  const decryptedPassword = CryptoJS.AES.decrypt(password, "123456").toString(
    CryptoJS.enc.Utf8
  );
  const decryptedPassword1 = CryptoJS.AES.decrypt(password1, "123456").toString(
    CryptoJS.enc.Utf8
  );

  if (decryptedPassword !== decryptedPassword1) {
    return NextResponse.json({ message: "密码不一致" }, { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (tx: any) => {
      // 检查用户名是否存在
      const existingUser = await tx.users_info.findUnique({
        where: { username },
      });

      if (existingUser) {
        throw new Error("用户已存在");
      }

      // 插入用户信息
      const newUser = await tx.users_info.create({
        data: { username },
      });

      // 生成盐和哈希密码
      const salt = bcrypt.genSaltSync(10);
      const hashPwd = bcrypt.hashSync(decryptedPassword, salt);

      // 插入密码信息
      await tx.users_pwd.create({
        data: {
          user_id: newUser.user_id,
          salt,
          hash_pwd: hashPwd,
        },
      });

      return newUser;
    });

    return NextResponse.json({ message: "注册成功" }, { status: 201 });
  } catch (error) {
    console.error("注册过程中发生错误:", error);
    if (error instanceof Error && error.message === "用户已存在") {
      return NextResponse.json({ message: "用户已存在" }, { status: 409 });
    }
    return NextResponse.json(
      { message: "注册失败，请稍后重试" },
      { status: 500 }
    );
  }
}
