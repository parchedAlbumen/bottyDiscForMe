import { Pool } from "pg";
import { config } from "../config";

const pool = new Pool({
    host: config.DB_HOST,
    user: config.DB_USER,
    database: config.DB_NAME,
    port: 5432
});

export default pool;