"use client";
import { useEffect } from "react";

// export const metadata = {
//   title: "域名",
// };

const Domain = () => {
  const fetchUser = async (params: any) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("User not found");
    }

    const user = await response.json();
    console.log(user);
  };

  useEffect(() => {
    fetchUser({ name: "", email: "", sort: "asc" });
  }, []); // 空依赖数组确保在组件挂载时只执行一次

  return (
    <div>
      <h1>domain</h1>
    </div>
  );
};

export default Domain;
