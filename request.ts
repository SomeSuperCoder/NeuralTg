import { Assistant } from "./assistant.ts";
import { Message as MyMessage } from "./message.ts";

interface Request {
    bot: Assistant,
    message: MyMessage,
    ctx: any
}
