// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_username',         // 数据库用户名
  host: '5432',             // 数据库主机
  database: 'userdb',            // 数据库名
  password: 'postgres',     // 数据库密码
  port: 5432,                    // PostgreSQL默认端口
});

export const query = (text, params) => pool.query(text, params);
