import { _application, _context, _router } from './deps.ts';
import { loadConfig } from './lib/classes/config.ts';
import { getAllCards, getCardById, createCard, updateCard, deleteCard } from './lib/controllers/controller.ts';

const app = new _application();
const router = new _router();
const config = await loadConfig('./config.yml');

router.get('/', (context: _context) => {
    context.response.body = 'Load Frontend here!'; // TODO: load frontend project here
})
    .get('/cards', getAllCards)
    .get('/cards/:id', getCardById)
    .post('/cards', createCard)
    .put('/cards', updateCard)
    .delete('/cards/:id', deleteCard);

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: config.port });