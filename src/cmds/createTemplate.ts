import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Workout } from "../helpers/workout";

export const data = new SlashCommandBuilder()
    .setName("create-template")
    .setDescription("Creates a template for the possible workouts! BRUAH(1)");

export async function execute(interaction: CommandInteraction) {
    const workout = new Workout();
    console.log("replying to user now!");
    return interaction.reply(workout.createBasicTemplate());
}