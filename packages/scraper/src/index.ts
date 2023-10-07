/* eslint-disable @typescript-eslint/no-misused-promises */
import { promises as fs } from "fs";
import { TelegramClient } from "telegram";
import type { NewMessageEvent } from "telegram/events";
import { NewMessage } from "telegram/events";
import { StringSession } from "telegram/sessions";

import type { Channel } from "@gebeyasearch/db";
import { prisma } from "@gebeyasearch/db";

import { env } from "../env";
import { logger } from "./utils/logger";

const session = new StringSession(env.TELEGRAM_SESSION);
const client = new TelegramClient(
    session,
    env.TELEGRAM_API_ID,
    env.TELEGRAM_API_HASH,
    { connectionRetries: 5 },
);

const timer = Date.now();

const getChats = async (): Promise<Channel[]> => {
    const duration = Date.now() - timer;
    const fiveMinutes = 5 * 60 * 1000;
    if (duration > fiveMinutes) {
        const channels = await prisma.channel.findMany();
        fs.writeFile("./channels.json", JSON.stringify(channels)).catch((e) => {
            logger.error(e);
        });
        return channels;
    }
    const json = await fs.readFile("./channels.json", "utf8");
    return JSON.parse(json) as Channel[];
};

async function handleMessages(event: NewMessageEvent) {
    const chats = await getChats();
    const isRegistered = chats.find(
        (chat) => chat.id === event.chatId?.toString(),
    );
    if (isRegistered) {
        logger.info("Processing new message...");
    }
}

client.addEventHandler(handleMessages, new NewMessage({ incoming: true }));

client.connect().catch((e) => {
    logger.error(e);
});
