import { _application, _context, _router } from './deps.ts';
import { configuration, loadConfig } from './lib/classes/config.ts';
import { getAllCards, getCardById, createCard, updateCard, deleteCard, getColumns } from './lib/controllers/controller.ts';

const app = new _application();
const router = new _router();
await loadConfig('./config.yml');

console.log(configuration);

router.get('/', (context: _context) => {
    context.response.body = 'Load Frontend here!'; // TODO: load frontend project here
})
    .get('/cards', getAllCards)
    .get('/cards/:id', getCardById)
    .post('/cards', createCard)
    .put('/cards', updateCard)
    .delete('/cards/:id', deleteCard)
    .get('/columns', getColumns)

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: configuration.port });