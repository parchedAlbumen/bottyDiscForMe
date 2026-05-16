import { Client } from "discord.js";
import { deployCommands } from "./cmds/deploy-commands";
import { commands } from "./cmds/commands";
import { config } from "./config";
import { Workout } from "./helpers/workout";
import { lookForCode } from "./helpers/queries";

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
    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        if (commands[commandName as keyof typeof commands]) {
            console.log("reached here");
            await commands[commandName as keyof typeof commands].execute(interaction);
        }
    } else if (interaction.isModalSubmit())  {
        if (interaction.customId === "creatingExercise") {
            const workoutType: string = interaction.fields.getTextInputValue("workoutType");
            const workoutName: string = interaction.fields.getTextInputValue("workoutName");
            const workoutCode: string = interaction.fields.getTextInputValue("workoutCode");
            const workoutSets: number = Number(interaction.fields.getTextInputValue("workoutSets"));
            const workoutReps: number = Number(interaction.fields.getTextInputValue("workoutReps"));
            if (!await lookForCode(interaction.user.id, workoutCode)) {
                interaction.reply("code/workout already exist!");
                return 
            }

            const wk = new Workout() 
            const isGood: boolean = await wk.pushExerciseToDatabase(
                wk.createExercise(workoutType, workoutName, workoutCode, workoutSets, workoutReps, 0, 0),
                interaction.user.id
            );
            if (isGood) interaction.reply("successfully pushed into the database!");
            else interaction.reply("wasn't able to push it to the database properly!");
        }
    }
})

client.login(config.DISCORD_TOKEN);