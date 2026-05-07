import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Workout } from "../helpers/workout";

export const data = new SlashCommandBuilder()
    .setName("create-template")
    .setDescription("Creates a template for the possible workouts!");

export async function execute(interaction: CommandInteraction) {
    const workout = new Workout();
    return interaction.reply(workout.createBasicTemplate());
}