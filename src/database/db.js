// sudo su -c "pg_dump <nome-da-sua-database> --inserts --no-owner" postgres > dump.sql

import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production" && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};

export const connection = new Pool(configDatabase);

