import { defineCommand } from "../slashcommand";
import { SlashCommandOptionType } from "../types/slashcommand";

export default defineCommand({
    name: 'echo',
    description: 'Echo what you input',
    options: [
        {
            name: 'text',
            description: 'The text to echo',
            type: SlashCommandOptionType.String,
            required: true,
        },
    ],
    async execute(interaction) {
        await interaction.reply({
            content: `${interaction.options.getString('text')}`,
            ephemeral: true,
        });
    }
});