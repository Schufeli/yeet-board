import { _parse } from '../../deps.ts';

export interface Config {
    columns: [
        {
            id: number,
            name: string,
            color: string
        }
    ],
    port: number
}

export async function loadConfig(file: string): Promise<Config> {
    return (_parse(await Deno.readTextFile(file)) as Config);
}