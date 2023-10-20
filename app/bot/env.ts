import { createEnv } from "@t3-oss/env-core";
import { API_CONSTANTS } from "grammy";
import z, { ZodError, ZodIssueCode } from "zod";

function parseJsonSafe(path: string) {
    return (value: unknown) => {
        try {
            return JSON.parse(String(value));
        } catch {
            throw new ZodError([
                {
                    code: ZodIssueCode.custom,
                    path: [path],
                    fatal: true,
                    message: "Invalid JSON",
                },
            ]);
        }
    };
}

export const env = createEnv({
    server: {
        TELEGRAM_BOT_TOKEN: z.string(),
        NODE_ENV: z.enum(["development", "production"]),
        BOT_WEBHOOK: z.string().url(),
        BOT_SERVER_HOST: z.string().default("0.0.0.0"),
        BOT_SERVER_PORT: z.coerce.number().positive().default(80),
        BOT_ALLOWED_UPDATES: z
            .preprocess(
                parseJsonSafe("BOT_ALLOWED_UPDATES"),
                z.array(z.enum(API_CONSTANTS.ALL_UPDATE_TYPES)),
            )
            .default([]),
    },
    runtimeEnv: {
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        NODE_ENV: process.env.NODE_ENV,
        BOT_WEBHOOK: process.env.BOT_WEBHOOK,
        BOT_SERVER_HOST: process.env.BOT_SERVER_HOST,
        BOT_SERVER_PORT: process.env.BOT_SERVER_PORT,
        BOT_ALLOWED_UPDATES: process.env.BOT_ALLOWED_UPDATES,
    },
});
