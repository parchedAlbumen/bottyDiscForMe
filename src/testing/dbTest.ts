import pool from "../db/db";

async function testingDB() {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows);
}

testingDB();