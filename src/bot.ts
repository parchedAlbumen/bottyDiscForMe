import { Client } from "discord.js";
import { deployCommands } from "./cmds/deploy-commands";
import { commands } from "./cmds/commands";
import { config } from "./config";

const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("clientReady", () => {
    console.log("Discord bot is ready!");
});

client.on("guildCreate", async (guild) => {
    await deployCommands();
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        await commands[commandName as keyof typeof commands].execute(interaction);
    }
})

client.login(config.DISCORD_TOKEN);