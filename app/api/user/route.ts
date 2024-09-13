import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db";
import { User } from "@/types/user";

// 定义 User 类型

// 处理 API 请求
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.body;

    // 检查请求体是否包含用户名
    if (!name) {
      return res.status(400).json({ message: "Username is required" });
    }

    try {
      // 查询数据库，查找匹配的用户名
      const result = await query("SELECT * FROM users WHERE name = $1", [name]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // 类型断言查询结果为 User 类型
      const user: User = result.rows[0];

      // 返回用户信息
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
