import pool from "../db/db";

async function testignDB() {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows);
}

testignDB();