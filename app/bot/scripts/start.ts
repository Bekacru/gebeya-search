#!/usr/bin/env tsx
import { onShutdown } from "node-graceful-shutdown";

import { env } from "../env.js";
import { createBot } from "../src/index.js";
import { createServer } from "../src/server/index.js";

try {
    const bot = createBot(env.TELEGRAM_BOT_TOKEN);
    const server = await createServer(bot);

    // Graceful shutdown
    onShutdown(async () => {
        console.log("shutdown");

        await server.close();
        await bot.stop();
    });

    if (env.NODE_ENV === "production") {
        // to prevent receiving updates before the bot is ready
        await bot.init();

        await server.listen({
            host: env.BOT_SERVER_HOST,
            port: env.BOT_SERVER_PORT,
        });

        await bot.api.setWebhook(env.BOT_WEBHOOK, {
            allowed_updates: env.BOT_ALLOWED_UPDATES,
        });
    } else if (env.NODE_ENV === "development") {
        await bot.start({
            allowed_updates: env.BOT_ALLOWED_UPDATES,
            onStart: ({ username }) =>
                console.log({
                    msg: "bot running...",
                    username,
                }),
        });
    }
} catch (error) {
    console.log(error);
    process.exit(1);
}
