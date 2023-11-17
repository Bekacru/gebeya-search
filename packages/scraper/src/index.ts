/* eslint-disable @typescript-eslint/no-misused-promises */
import { promises as fs } from "fs";
import { TelegramClient } from "telegram";
import type { NewMessageEvent } from "telegram/events";
import { NewMessage } from "telegram/events";
import { StringSession } from "telegram/sessions";

import type { Shop } from "@gebeyasearch/db";
import { prisma } from "@gebeyasearch/db";

import { env } from "../env";
import { getPrice } from "./utils/get-price";
import { logger } from "./utils/logger";

const session = new StringSession(env.TELEGRAM_SESSION);
const client = new TelegramClient(
    session,
    env.TELEGRAM_API_ID,
    env.TELEGRAM_API_HASH,
    { connectionRetries: 5 },
);

const timer = Date.now();

const getChats = async (): Promise<Shop[]> => {
    const duration = Date.now() - timer;
    const fiveMinutes = 5 * 60 * 1000;
    if (duration > fiveMinutes) {
        const shop = await prisma.shop.findMany();
        fs.writeFile("./shop.json", JSON.stringify(shop)).catch((e) => {
            logger.error(e);
        });
        return shop;
    }
    const json = await fs.readFile("./shop.json", "utf8");
    return JSON.parse(json) as Shop[];
};

async function handleMessages(event: NewMessageEvent) {
    if (!event.message.photo || !event.message.message) {
        return;
    }
    const chats = await getChats();
    const isRegistered = chats.find(
        (chat) => chat.id === event.chatId?.toString(),
    );
    if (!isRegistered) {
        return;
    }
    logger.info("Processing Product");
    const price = getPrice(event.message.message);
    const title = event.message.message.split("\n")[0];
    const description = event.message.message;
    const ethiopianPhoneNumberRegex = /^(?:(?:\+251)|(?:0))(9\d{8})$/;
    const phoneNumber = event.message.message.match(
        ethiopianPhoneNumberRegex,
    )?.[0];
    const username = (event.message.chat as { username: string }).username;
    const productLink = `https://t.me/${username}/${event.message.id}`;
    console.log(productLink, price, title, description, phoneNumber);
}

client.addEventHandler(handleMessages, new NewMessage({ incoming: true }));

client.connect().catch((e) => {
    logger.error(e);
});
