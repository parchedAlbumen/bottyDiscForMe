import { ModalBuilder, LabelBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export function createExerciseModal(): ModalBuilder {
    const modal = new ModalBuilder()
        .setCustomId("creatingExercise")
        .setTitle("Creating an Exercise");
        
    const workoutTypeInput = new TextInputBuilder()
        .setCustomId("workoutType")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(5)
        .setRequired(true);
        
    const workoutTypeLabel = new LabelBuilder()
        .setLabel("is this upper/lower")
        .setTextInputComponent(workoutTypeInput)

    const workoutNameInput = new TextInputBuilder()
        .setCustomId("workoutName")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(100)
        .setRequired(true);

    const workoutNameLabel = new LabelBuilder()
        .setLabel("What is the name of the workout?")
        .setTextInputComponent(workoutNameInput);
 
    const workoutCodeInput = new TextInputBuilder()
        .setCustomId("workoutCode")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(10)
        .setRequired(true);

    const workoutCodeLabel = new LabelBuilder()
        .setLabel("What will be the code for this")
        .setTextInputComponent(workoutCodeInput);

    const setsInput = new TextInputBuilder()
        .setCustomId("workoutSets")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(1)
        .setRequired(true);

    const setsLabel = new LabelBuilder()
        .setLabel("How many sets?")
        .setTextInputComponent(setsInput)

    const repsInput = new TextInputBuilder()
        .setCustomId("workoutReps")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(2)
        .setRequired(true);

    const repsLabel = new LabelBuilder() 
        .setLabel("How many reps?")
        .setTextInputComponent(repsInput);

    modal.addLabelComponents(
        workoutTypeLabel,
        workoutNameLabel,
        workoutCodeLabel,
        setsLabel,
        repsLabel
    );
    
    return modal;
}