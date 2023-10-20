import fastify from "fastify";
import { webhookCallback } from "grammy";

import type { Bot } from "../index.js";

export const createServer = async (bot: Bot) => {
    const server = fastify();

    server.setErrorHandler(async (error, request, response) => await response.status(500).send({ error: "Oops! Something went wrong." }));

    server.get("/", () => ({ status: true }));

    server.post(`/${bot.token}`, webhookCallback(bot, "fastify"));

    return server;
};
