import { load_bots, load_users } from "./assistant.ts";

import Pocketbase from "npm:pocketbase@latest";
import { Telegraf } from "npm:telegraf@latest";
import { message } from "npm:telegraf@latest/filters";
import { extract_tags } from "./utils.ts";

const pb = new Pocketbase("http://127.0.0.1:8090");
pb.autoCancellation(false);

const ais = await load_bots(pb);
const users = await load_users(pb);

const bot = new Telegraf(Deno.env.get("TOKEN")!);

console.log(extract_tags("@robert @asdas Hello, guys! And @allen too!", ais, users));

bot.start((ctx) => {
    ctx.reply(
        `Добро пожаловать в NeuralConf Telegram Edition\nВаш Telegram ID: ||${ctx.from.id}||`,
        {
            parse_mode: "MarkdownV2"
        }
    );
});

bot.on(message('text'), async (ctx) => {
    const tags = extract_tags(ctx.message.text, ais, []);

    await ctx.reply(ctx.message.text)
})

bot.launch();
