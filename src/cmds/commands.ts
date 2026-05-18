import * as ping from "./ping";
import * as createTemplate from "./createTemplate";
import * as createExercise from "./createExercise";
import * as updateUpper from "./updateUpper";

export const commands = {
    ping,
    "create-template": createTemplate,
    "create-exercise": createExercise,
    "update_upper": updateUpper,
};