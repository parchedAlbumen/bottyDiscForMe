import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { advanceRotation, getRotation, getWeeklyProgress } from "../helpers/queries";

export const data = new SlashCommandBuilder()
    .setName("end_workout")
    .setDescription("End your workout and see your 7-day progress report");

export async function execute(interaction: CommandInteraction) {
    const currentDay = await getRotation(interaction.user.id);
    const currentLabel = currentDay === "upper_type1" ? "Upper (Type 1)" : "Upper (Type 2)";

    const progress = await getWeeklyProgress(interaction.user.id);
    const nextDay = await advanceRotation(interaction.user.id);
    const nextLabel = nextDay === "upper_type1" ? "Upper (Type 1)" : "Upper (Type 2)";

    let summary = `**Workout Complete! ${currentLabel}**\n\n`;

    if (progress.length === 0) {
        summary += `No weight updates recorded in the last 7 days.\n`;
    } else {
        summary += `**Progress (last 7 days):**\n`;
        for (const ex of progress) {
            const first = Number(ex.first_weight);
            const last = Number(ex.last_weight);
            const diff = last - first;
            if (diff > 0) {
                summary += `**${ex.name}**: ${first}kg → ${last}kg (**+${diff}kg** ↑)\n`;
            } else if (diff < 0) {
                summary += `**${ex.name}**: ${first}kg → ${last}kg (**${diff}kg** ↓)\n`;
            } else {
                summary += `**${ex.name}**: ${last}kg (no change)\n`;
            }
        }
    }

    summary += `\n**Next up:** ${nextLabel}`;

    await interaction.reply({ content: summary, ephemeral: true });
}
