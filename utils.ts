import { Assistant } from "./assistant.ts";
import { User } from "./auth.ts";

export function extract_tags(text: string, ais: Assistant[], users: User[]) {
    const result = [];

    const objects = [...ais, ...users];

    for (const i in objects) {
        const obj = objects[i];

        const tag = `@${obj.username}`;
        
        if (text.includes(tag)) result.push(obj.username);
    }

    return result;
}
