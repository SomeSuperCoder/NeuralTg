export enum Role {
    System = "system",
    User = "user",
    Assistant = "assistant",
}

export interface Message {
    role: Role,
    content: string
}
