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

export async function getLowerBodyWorkouts(user_id: string): Promise<{ name: string; code: string }[]> {
    try {
        const result = await pool.query(
            "SELECT workout_name, code FROM workouts WHERE user_id = $1 AND workout_type = 'lower' ORDER BY workout_name",
            [user_id]
        );
        return result.rows.map((row) => ({ name: row.workout_name, code: row.code }));
    } catch (error) {
        console.error("BAD!", error);
        return [];
    }
}

export async function getUpperBodyWorkouts(user_id: string): Promise<{ name: string; code: string }[]> {
    try {
        const result = await pool.query(
            "SELECT workout_name, code FROM workouts WHERE user_id = $1 AND workout_type = 'upper' ORDER BY workout_name",
            [user_id]
        );
        return result.rows.map((row) => ({ name: row.workout_name, code: row.code }));
    } catch (error) {
        console.error("BAD!", error);
        return [];
    }
}

export async function deleteWorkout(user_id: string, code: string): Promise<boolean> {
    try {
        await pool.query(
            "DELETE FROM workouts WHERE user_id = $1 AND code = $2",
            [user_id, code]
        );
        return true;
    } catch (error) {
        console.error("BAD!", error);
        return false;
    }
}

export async function updateWorkoutWeights(user_id: string, code: string, minWeight: number, maxWeight: number): Promise<boolean> {
    try {
        await pool.query(
            "UPDATE workouts SET min_weight = $1, max_weight = $2 WHERE user_id = $3 AND code = $4",
            [minWeight, maxWeight, user_id, code]
        );
        return true;
    } catch (error) {
        console.error("BAD!", error);
        return false;
    }
}