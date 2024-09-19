// lib / db.js;
// import { Pool } from "pg";

// const pool = new Pool({
//   user: "mu_di", // 数据库用户名
//   host: "localhost", // 数据库主机
//   database: "learninsilencedb", // 数据库名
//   password: "postgres", // 数据库密码
//   port: 5432, // PostgreSQL默认端口
// });

// export const query = (text, params) => pool.query(text, params);

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
export const query = (text, params) => pool.query(text, params);
