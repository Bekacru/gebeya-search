import { Bot } from "grammy";

import { env } from "../env";

const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
