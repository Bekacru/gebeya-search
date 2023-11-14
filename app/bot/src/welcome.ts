import { Composer } from "grammy";

const composer = new Composer();

const feature = composer.chatType("private");

feature.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

export { composer as welcomeFeature };
