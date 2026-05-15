import { CommandInteraction, LabelBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Workout } from "../helpers/workout";
import { createExerciseModal } from "../helpers/modals";

export const data = new SlashCommandBuilder()
    .setName("create-")
    .setDescription("Creates a template for the possible workouts! BRUAH(1)");

export async function execute(interaction: CommandInteraction) {
    const modal = createExerciseModal();
    await interaction.showModal(modal);    
}