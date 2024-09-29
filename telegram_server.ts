import { Assistant } from "./assistant.ts";
import { Telegraf } from "telegraf";

export async function telegram_server(assistant: Assistant) {
    const bot = new Telegraf(assistant.token);

    bot.start((ctx) => {
        ctx.reply(
            `Добро пожаловать в чат с ИИ ${assistant.name}\nВаш Telegram ID: ||${ctx.from.id}||`,
            {
                parse_mode: "MarkdownV2"
            }
        );
    });

    try {
        await bot.launch();
    } catch (e) {
        console.log(e);
        console.log(`Failed to launch Telegram bot for AI ${assistant.username}`);
    }
}
