import { ChatInputCommandInteraction, Interaction } from "discord.js";

export enum SlashCommandOptionType {
    SubCommand = 1,
    SubCommandGroup,
    String,
    Integer,
    Boolean,
    User,
    Channel,
    Role,
    Mentionable,
    Number,
}

export type SlashCommandOption = {
    name: string;
    description: string;
    type: SlashCommandOptionType;
    required: boolean;
    choices?: { name: string; value: string; }[];
    min_length?: number;
    max_length?: number;
    min_value?: number;
    max_value?: number;
};

export type SlashCommand = {
    name: string;
    description: string;
    options?: SlashCommandOption[];
    listeners?: ((interaction: Interaction) => Promise<void>)[];
    execute?: (interaction: ChatInputCommandInteraction) => Promise<void>;
};