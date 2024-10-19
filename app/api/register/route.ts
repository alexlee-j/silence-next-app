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

  try {
    // 解密密码
    const decryptedPassword = CryptoJS.AES.decrypt(password, "123456").toString(
      CryptoJS.enc.Utf8
    );
    const decryptedPassword1 = CryptoJS.AES.decrypt(
      password1,
      "123456"
    ).toString(CryptoJS.enc.Utf8);

    // 在后端验证密码
    if (decryptedPassword !== decryptedPassword1) {
      return NextResponse.json({ message: "密码不一致" }, { status: 400 });
    }

    if (decryptedPassword.length < 6) {
      return NextResponse.json(
        { message: "密码长度不能少于6个字符" },
        { status: 400 }
      );
    }

    // 这里可以添加更多的密码验证逻辑，比如检查是否为连续密码等

    const result = await prisma.$transaction(async (tx) => {
      // 检查用户名是否存在
      const existingUser = await tx.users_info.findUnique({
        where: { username },
      });

      if (existingUser) {
        throw new Error("用户已存在");
      }

      // 插入用户信息
      const newUser = await tx.users_info.create({
        data: {
          username,
          users_pwd: {
            create: {
              salt: bcrypt.genSaltSync(10),
              hash_pwd: bcrypt.hashSync(
                decryptedPassword,
                bcrypt.genSaltSync(10)
              ),
            },
          },
          user_role: {
            create: {
              role: "user", // 默认角色
            },
          },
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
