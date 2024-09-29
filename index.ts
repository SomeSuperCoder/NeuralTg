import { load_bots } from "./assistant.ts";
import Pocketbase from "pocketbase";
import { telegram_server } from "./telegram_server.ts";

let pb = new Pocketbase("http://127.0.0.1:8090");
pb.autoCancellation(false);

const ais = await load_bots(pb);

for (const i in ais) {
    const ai = ais[i];

    telegram_server(ai);
}
