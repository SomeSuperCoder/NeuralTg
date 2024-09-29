import Pocketbase, { ClientResponseError } from "pocketbase";
import { Role, type Message } from "./message.ts";

export interface Assistant extends BaseAssistant {
    messages: Message[]
}

export interface BaseAssistant {
    username: string,
    name: string,
    model: "llama3.1" | "llama2-uncensored" | "llama3.2:3b" | "llama3.2:1b",   
    system_prompt: string,
    token: string
}

async function load_bot(base_assistant: BaseAssistant, pb: Pocketbase) {
    let messages = await pb.collection('messages').getFullList({
        sort: '-created',
        filter: `to="${base_assistant.username}"`
    }) as Message[];

    messages = [{role: Role.System, content: base_assistant.system_prompt} as Message, ...messages];

    const result_bot = {
        ...base_assistant,
        messages
    } as Assistant;

    return result_bot;
}

export async function load_bots(pb: Pocketbase) {
    let result: Assistant[] = [];

    const ais = await pb.collection('bots').getFullList({
        sort: '-created',
    }) as BaseAssistant[];

    for (const i in ais) {
        const base_ai = ais[i];
        const ai = await load_bot(base_ai, pb);

        result.push(
            ai
        )
    }
    
    return result;
}
