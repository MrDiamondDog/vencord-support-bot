import { defineCommand } from "../slashcommand";

export default defineCommand({
    name: 'ping',
    description: 'Ping!',
    async execute(interaction) {
        await interaction.reply({
            content: `Pong! ${interaction.client.ws.ping}ms`,
            ephemeral: true,
        });
    }
});