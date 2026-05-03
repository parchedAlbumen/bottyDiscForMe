import * as dotenv from "dotenv" 

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

console.log(DISCORD_CLIENT_ID + " is the discord id");
console.log(DISCORD_TOKEN + " is the token")