import * as dotenv from "dotenv" 

dotenv.config();

const {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DATABASE_URL,
    DB_HOST,
    DB_USER,
    DB_NAME,
} = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DATABASE_URL || !DB_HOST || !DB_USER || !DB_NAME) {
    throw new Error("Missing environment variables");
}

export const config = {
    DISCORD_CLIENT_ID,
    DISCORD_TOKEN,
    DATABASE_URL,
    DB_HOST,
    DB_NAME,
    DB_USER
};