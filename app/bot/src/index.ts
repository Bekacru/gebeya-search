import { Bot as TelegramBot } from "grammy";

import { welcomeFeature } from "./welcome.js";

export function createBot(token: string) {
    const bot = new TelegramBot(token);

    bot.use(welcomeFeature);

    return bot;
}

export type Bot = ReturnType<typeof createBot>;
