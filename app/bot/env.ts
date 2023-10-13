import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        TELEGRAM_BOT_TOKEN: z.string().min(4),
    },
    runtimeEnv: {
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    },
});
