import * as ping from "./ping";
import * as createTemplate from "./createTemplate";
import * as createExercise from "./createExercise";
import * as updateUpper from "./updateUpper";
import * as updateLower from "./updateLower";
import * as workoutDay from "./workoutDay";
import * as endWorkout from "./endWorkout";

export const commands = {
    ping,
    "create-template": createTemplate,
    "create-exercise": createExercise,
    "update_upper": updateUpper,
    "update_lower": updateLower,
    "workout_day": workoutDay,
    "end_workout": endWorkout,
};