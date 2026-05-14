import pool from "../db/db";
import { Exercise } from "./interfaces";

export async function insertExer(exer: Exercise, user_id: string) {
    try {
        await pool.query(
            "INSERT INTO workouts (workout_type, workout_name, code, sets, reps, min_weight, max_weight, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [exer.workoutType, exer.name, exer.code, exer.sets, exer.reps, exer.minWeight, exer.maxWeight, user_id]
        );
        console.log("successfully inserted!");
    } catch (error) {
        console.error("BAD!", error);
    }
}

export async function lookForID(user_id: string): Promise<boolean> {
    try {
        const result = await pool.query(
            "SELECT * FROM workouts WHERE user_id = $1",
            [user_id]
        );
        if (result.rowCount === 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("BAD!", error);
        return false;
    }
}
//continue here im kind of sleepy, SELECT QUERY 