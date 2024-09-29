import Pocketbase from "npm:pocketbase@latest";

export interface User {
    username: string,
    telegram_id: string
}

export async function get_account(telegram_id: string, pb: Pocketbase) {
    try {
        return await pb.collection('users').getFirstListItem(`telegram_id=${telegram_id}`) as User;
    } catch {
        return null;
    }
}
