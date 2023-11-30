import "dotenv/config";
import { ChatInputCommandInteraction, Client, Events, GatewayIntentBits } from "discord.js";
import { commands, findAllCommands } from "./slashcommand";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] });

client.once(Events.ClientReady, async (readyClient) => {
    await findAllCommands();

    for (const command of commands) {
        if (!command.listeners) continue;

        for (const listener of command.listeners) {
            client.on(Events.InteractionCreate, listener);
        }
    }

    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.find(command => command.name === interaction.commandName);
    if (!command) return;

    try {
        console.log(`Executing command ${command.name}`);
        await command.execute?.(interaction as ChatInputCommandInteraction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
