import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import * as workout from "../helpers/workout"; 

export const data = new SlashCommandBuilder()
.setName("ping")
.setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction) {
    return interaction.reply("Pong!");
}