import { Exercise } from "./interfaces";


export class Workout {
    private exercises: Exercise[];

    constructor() {
        this.exercises = []; //empty array for now
    }

    public createBasicTemplate(): string {
        return "hello";
    }
}

