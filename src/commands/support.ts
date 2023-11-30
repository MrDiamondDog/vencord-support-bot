import { ButtonStyle, ComponentType, InteractionEditReplyOptions, InteractionReplyOptions } from "discord.js";
import { defineCommand } from "../slashcommand";
const supportPages = require('../../assets/support.json') as { [key: string]: SupportPage; };

type SupportPage = {
    title: string;
    description: string;
    buttons: {
        label: string;
        style: keyof typeof ButtonStyle;
        goto: string;
        disabled: boolean;
    }[];
};

const currentPage = supportPages.start;

function pageToJSON(page: SupportPage): InteractionReplyOptions {
    // split into groups of 5
    let buttons: SupportPage['buttons'][] = [];

    for (let i = 0; i < page.buttons.length; i += 5) {
        buttons.push(page.buttons.slice(i, i + 5));
    }

    return {
        embeds: [
            {
                title: page.title,
                description: page.description,
                color: 0xd3869b
            }
        ],
        components: buttons.map(buttonGroup => ({
            type: ComponentType.ActionRow,
            components: buttonGroup.map(button => ({
                type: ComponentType.Button,
                label: button.label,
                style: ButtonStyle[button.style],
                customId: button.style != "Link" ? `support_${button.goto}` : "",
                disabled: button.disabled,
                url: ""
            }))
        }))
    };
}

export default defineCommand({
    name: 'support',
    description: 'Provides support for Vencord.',
    listeners: [
        async (interaction) => {
            if (!interaction.isButton()) return;

            const page = supportPages[interaction.customId.replace('support_', '')];
            if (!page) return;

            await interaction.update(pageToJSON(page) as InteractionEditReplyOptions);
        }
    ],
    async execute(interaction) {
        await interaction.reply({
            ephemeral: true,
            ...pageToJSON(currentPage),
        });
    }
});