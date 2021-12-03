import { _application, _context, _router } from './deps.ts';
import { loadConfig } from './lib/classes/config.ts';
import { getAllCards, getCardById, createCard } from './controllers.ts';

const app = new _application();
const router = new _router();
const config = await loadConfig('./config.yml');

router.get('/', (context: _context) => {
    context.response.body = 'Load Frontend here!'; // TODO: load frontend project here
})
    .get('/cards', getAllCards)
    .get('/cards:id', getCardById)
    .post('/cards', createCard)

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: config.port });