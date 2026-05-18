import { ActionRowBuilder, CommandInteraction, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { getLowerBodyWorkouts } from "../helpers/queries";

export const data = new SlashCommandBuilder()
    .setName("update_lower")
    .setDescription("Update or delete a lower body exercise");

export async function execute(interaction: CommandInteraction) {
    const workouts = await getLowerBodyWorkouts(interaction.user.id);

    if (workouts.length === 0) {
        await interaction.reply({ content: "You have no lower body workouts!", ephemeral: true });
        return;
    }

    const select = new StringSelectMenuBuilder()
        .setCustomId("lower_workout_select")
        .setPlaceholder("Which lower body workout?")
        .addOptions(
            workouts.map((w) =>
                new StringSelectMenuOptionBuilder().setLabel(w.name).setValue(w.code)
            )
        );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);

    await interaction.reply({ components: [row], ephemeral: true });
}
