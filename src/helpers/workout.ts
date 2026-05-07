import { Exercise } from "./interfaces";


export class Workout {
    private exercises: Exercise[];

    constructor() {
        this.exercises = []; //empty array for now
    }
    
    private createBasicWorkout(): void {
        this.addUpperBody();
        this.addLowerBody();
    }

    private addUpperBody(): void {
        this.exercises.push(this.createExercise("upper", "Barbell Bench Press", "bbp", 4, 5, 0, 0));
        this.exercises.push(this.createExercise("upper", "Barbell Row", "br", 4, 6, 0, 0));
        this.exercises.push(this.createExercise("upper", "Chest Supported Row", "csr", 4, 6, 0, 0));
        this.exercises.push(this.createExercise("upper", "Weighted Pull-Ups", "wpu", 3, 6, 0, 0));
        this.exercises.push(this.createExercise("upper", "Lat Pulldown", "lpd", 4, 8, 0, 0));
        this.exercises.push(this.createExercise("upper", "Seated DB Shoulder Press", "sdbsp", 3, 6, 0, 0));
        this.exercises.push(this.createExercise("upper", "Incline DB Press", "idbp", 4, 8, 0, 0));
        this.exercises.push(this.createExercise("upper", "Face Pulls", "fp", 3, 12, 0, 0));
        this.exercises.push(this.createExercise("upper", "Lateral Raises", "lr", 3, 12, 0, 0));
        this.exercises.push(this.createExercise("upper", "Overhead Triceps Extension", "ote", 3, 8, 0, 0));
        this.exercises.push(this.createExercise("upper", "Barbell Curls", "bbc", 3, 6, 0, 0));
        this.exercises.push(this.createExercise("upper", "EZ-Bar Curls", "ezc", 3, 6, 0, 0));
        this.exercises.push(this.createExercise("upper", "Cable Fly", "cf", 3, 10, 0, 0));
        this.exercises.push(this.createExercise("upper", "Pec Deck", "pd", 3, 10, 0, 0));
        this.exercises.push(this.createExercise("upper", "Seated Cable Row", "scr", 3, 10, 0, 0));
        this.exercises.push(this.createExercise("upper", "Cable Pullover", "cp", 3, 10, 0, 0));
        this.exercises.push(this.createExercise("upper", "DB Pullover", "dbp", 3, 10, 0, 0));
        this.exercises.push(this.createExercise("upper", "Rear Delt Fly", "rdf", 3, 15, 0, 0));
        this.exercises.push(this.createExercise("upper", "Rope Pushdowns", "rpd", 3, 12, 0, 0));
        this.exercises.push(this.createExercise("upper", "Hammer Curls", "hc", 3, 10, 0, 0));
        this.exercises.push(this.createExercise("upper", "Incline DB Curls", "idbc", 3, 10, 0, 0));
    }

    private addLowerBody(): void {
        this.exercises.push(this.createExercise("lower", "Squat", "sq", 4, 8, 0, 0));
        this.exercises.push(this.createExercise("lower", "Romanian Deadlift", "rdl", 4, 8, 0, 0));
        this.exercises.push(this.createExercise("lower", "Stationary Lunges", "sl", 3, 8, 0, 0));
        this.exercises.push(this.createExercise("lower", "Leg Extension", "le", 3, 10, 0, 0));
        this.exercises.push(this.createExercise("lower", "Leg Curl", "lc", 3, 10, 0, 0));
        this.exercises.push(this.createExercise("lower", "Hip Adductor Machine", "ham", 3, 12, 0, 0));
        this.exercises.push(this.createExercise("lower", "Calf Raises", "cr", 4, 12, 0, 0));
    }

    private createExercise(workoutType: string, name: string, code: string, sets: number, reps: number, minWeight: number, maxWeight: number): Exercise {
        return {
            workoutType,
            name,
            code,
            sets,
            reps,
            maxWeight,
            minWeight
        }
    }

    public createBasicTemplate(): string { //i feel like i can make this cleaner
        let template = "```";
        this.createBasicWorkout();
        this.exercises.forEach((exer) => {
            if (exer.workoutType === "upper") {
                template += (this.exerciseSummary(exer) + "\n");
            }
        })
        template += "\n";

        this.exercises.forEach((exer) => {
            if (exer.workoutType === "lower") {
                template += (this.exerciseSummary(exer) + "\n");
            }
        })
        template += "```";
        return template;
    }

    private exerciseSummary(exer: Exercise): string {
        return `[${exer.workoutType.toUpperCase()}] ${exer.code.toUpperCase()} - ${exer.name} (${exer.sets}x${exer.reps}) | ${exer.minWeight}-${exer.maxWeight}kg`;
    }
}

