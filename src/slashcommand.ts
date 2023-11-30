import fs from 'fs';
import path from 'path';
import { SlashCommand } from "./types/slashcommand";

export const commands: SlashCommand[] = [];

export async function findAllCommands(): Promise<SlashCommand[]> {
    return new Promise<SlashCommand[]>(resolve => {
        const folder = path.join(__dirname, 'commands');
        const files = fs.readdirSync(folder);

        for (const file of files) {
            if (!file.endsWith('.ts') || file.startsWith("_")) continue;
            const command = require(path.join(folder, file.replace(".ts", ""))).default;
            commands.push(command);
        }

        resolve(commands);
    });
}

export function defineCommand(options: SlashCommand) {
    return options;
}