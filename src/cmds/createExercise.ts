import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { createExerciseModal } from "../helpers/modals";

export const data = new SlashCommandBuilder()
    .setName("create-exercise")
    .setDescription("Creates a template for the possible workouts! BRUAH(1)");

export async function execute(interaction: CommandInteraction) {
    const modal = createExerciseModal();
    await interaction.showModal(modal);    
}