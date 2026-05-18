import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } from "discord.js";
import { deployCommands } from "./cmds/deploy-commands";
import { commands } from "./cmds/commands";
import { config } from "./config";
import { Workout } from "./helpers/workout";
import { deleteWorkout, lookForCode, updateWorkoutWeights } from "./helpers/queries";
import { updateUpperModal } from "./helpers/modals";

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
    } else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === "upper_workout_select") {
            const code = interaction.values[0];
            const updateBtn = new ButtonBuilder()
                .setCustomId(`upper_update:${code}`)
                .setLabel("Update")
                .setStyle(ButtonStyle.Primary);
            const deleteBtn = new ButtonBuilder()
                .setCustomId(`upper_delete:${code}`)
                .setLabel("Delete")
                .setStyle(ButtonStyle.Danger);
            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(updateBtn, deleteBtn);
            await interaction.update({ content: "Update or Delete?", components: [row] });
        }
    } else if (interaction.isButton()) {
        if (interaction.customId.startsWith("upper_update:")) {
            const code = interaction.customId.split(":").slice(1).join(":");
            await interaction.showModal(updateUpperModal(code));
        } else if (interaction.customId.startsWith("upper_delete:")) {
            const code = interaction.customId.split(":").slice(1).join(":");
            const isGood = await deleteWorkout(interaction.user.id, code);
            await interaction.update({
                content: isGood ? `Successfully deleted \`${code}\`!` : "Failed to delete — database might be off.",
                components: [],
            });
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
        } else if (interaction.customId.startsWith("upper_update_modal:")) {
            const code = interaction.customId.split(":").slice(1).join(":");
            const minWeight = Number(interaction.fields.getTextInputValue("minWeight"));
            const maxWeight = Number(interaction.fields.getTextInputValue("maxWeight"));
            const isGood = await updateWorkoutWeights(interaction.user.id, code, minWeight, maxWeight);
            await interaction.reply({
                content: isGood ? `Updated \`${code}\` weights to ${minWeight}–${maxWeight}kg!` : "Failed to update — database might be off.",
                ephemeral: true,
            });
        }
    }
})

client.login(config.DISCORD_TOKEN);