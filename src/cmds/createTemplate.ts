import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Workout } from "../helpers/workout";

export const data = new SlashCommandBuilder()
    .setName("create-template")
    .setDescription("Creates a template for the possible workouts! BRUAH(1)");

export async function execute(interaction: CommandInteraction) {
    const workout = new Workout();
    console.log(interaction.user.id + " is the user ID");
    console.log(interaction.user.displayName + " is the user name");
    return interaction.reply(await workout.createBasicTemplate(interaction.user.id));
}