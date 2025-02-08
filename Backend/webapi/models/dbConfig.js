import pg from "pg";
import dotenv from 'dotenv';

dotenv.config()

const db = new pg.Client({
    user: process.env.DB_user,
    port: process.env.DB_port,
    host: process.env.DB_host,
    password: process.env.DB_password,
    database: process.env.DB_database
})

export default db;
