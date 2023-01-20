import { _parse } from '../../deps.ts';

interface IConfig {
    columns: [
        {
            id: number,
            name: string,
            color: string
        }
    ],
    port: number
}

export class Config implements IConfig {
    constructor() { // Needed to implement class
        this.columns = [{ id: 0, name: "", color: ""}],
        this.port = 0
    }

    columns: [{ id: number; name: string; color: string; }];
    port: number; 
}

export let configuration: Config = new Config();

export async function loadConfig(file: string): Promise<boolean> {
    configuration = (_parse(await Deno.readTextFile(file)) as Config);
    return true;
}