import { _application } from './deps.ts';
import { loadConfig } from './lib/classes/config.ts';

const app = new _application();
const config = await loadConfig('./config.yml');



app.use(() => { // TODO: remove after development
    console.log("Server up and running..."); 
});

await app.listen({ port: config.port });