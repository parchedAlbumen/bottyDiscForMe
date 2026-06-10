import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getRotation } from "../helpers/queries";

export const data = new SlashCommandBuilder()
    .setName("workout_day")
    .setDescription("See what workout you should do today");

export async function execute(interaction: CommandInteraction) {
    const currentDay = await getRotation(interaction.user.id);
    const label = currentDay === "upper_type1" ? "Upper (Type 1)" : "Upper (Type 2)";

    await interaction.reply({
        content: `Today's workout: **${label}**\n\nUse \`/end_workout\` when you're done to log your progress and queue the next day.`,
        ephemeral: true,
    });
}
