import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const poolConnMitra = mysql.createPool({
    host        : process.env.DB_MITRA_HOST,
    user        : process.env.DB_MITRA_USER,
    password    : process.env.DB_MITRA_PASS,
    database    : process.env.DB_MITRA_CUSTOMERS_SCHEMA
}).promise();

export const poolConnDasarata = mysql.createPool({
    host        : process.env.DB_MITRA_HOST,
    user        : process.env.DB_MITRA_USER,
    password    : process.env.DB_MITRA_PASS,
    database    : process.env.DB_DASARATA_CHANNEL_SCHEMA
}).promise();