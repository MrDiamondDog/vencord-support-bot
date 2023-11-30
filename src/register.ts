import "dotenv/config";
import { REST, Routes } from "discord.js";
import { findAllCommands } from "./slashcommand";

(async () => {
    const commands = await findAllCommands().then(commands => commands.map(command => {
        delete command.execute;
        delete command.listeners;
        return command;
    }));

    const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

    try {
        // The put method is used to fully refresh all commands in the guild with the current set
        await rest.put(
            Routes.applicationCommands(process.env.APP_ID!),
            { body: commands },
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }

    console.log(`Successfully registered ${commands.length} slash commands!`);
})();