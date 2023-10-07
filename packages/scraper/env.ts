import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
    server: {
        TELEGRAM_API_ID: z.string().min(4).transform(arg=> parseInt(arg)),
        TELEGRAM_API_HASH: z.string().min(4),
        TELEGRAM_SESSION: z.string().min(4),
        DATABASE_URL: z.string().min(4)
    },
    runtimeEnv: {
        TELEGRAM_API_ID: process.env.TELEGRAM_API_ID,
        TELEGRAM_API_HASH: process.env.TELEGRAM_API_HASH,
        TELEGRAM_SESSION: process.env.TELEGRAM_SESSION,
        DATABASE_URL: process.env.DATABASE_URL
    }
})