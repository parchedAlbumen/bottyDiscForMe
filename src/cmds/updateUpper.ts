import { ActionRowBuilder, CommandInteraction, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { getUpperBodyWorkouts } from "../helpers/queries";

export const data = new SlashCommandBuilder()
    .setName("update_upper")
    .setDescription("Update or delete an upper body exercise");

export async function execute(interaction: CommandInteraction) {
    const workouts = await getUpperBodyWorkouts(interaction.user.id);

    if (workouts.length === 0) {
        await interaction.reply({ content: "You have no upper body workouts!", ephemeral: true });
        return;
    }

    const select = new StringSelectMenuBuilder()
        .setCustomId("upper_workout_select")
        .setPlaceholder("Which upper body workout?")
        .addOptions(
            workouts.map((w) =>
                new StringSelectMenuOptionBuilder().setLabel(w.name).setValue(w.code)
            )
        );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);

    await interaction.reply({ components: [row], ephemeral: true });
}