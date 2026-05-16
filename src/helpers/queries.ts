import pool from "../db/db";
import { Exercise } from "./interfaces";

export async function insertExer(exer: Exercise, user_id: string): Promise<boolean> {
    try {
        await pool.query(
            "INSERT INTO workouts (workout_type, workout_name, code, sets, reps, min_weight, max_weight, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [exer.workoutType, exer.name, exer.code, exer.sets, exer.reps, exer.minWeight, exer.maxWeight, user_id]
        );
        console.log("successfully inserted!");
        return true;
    } catch (error) {
        console.error("BAD!", error);
        return false;
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

export async function lookForCode(user_id: string, code: string): Promise<boolean> {
    try {
        const result = await pool.query(
            "SELECT * FROM workouts WHERE user_id = $1 AND code = $2",
            [user_id, code]
        );

        if (result.rowCount === null || result.rowCount > 0) return false; 
        return true; //because it should be free from here 
    } catch (error) {
        console.error("BAD!", error);
        return false;
    }
}

//next is deleting 
//updating maxWeight
//updating minWeight
//viewing workouts and stuff::

//possible stuff to add later on : progress chart/tyep of bar progress thing so we can do comparisons