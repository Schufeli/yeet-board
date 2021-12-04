import { _application, _context, _router, _send } from './deps.ts';
import { configuration, loadConfig } from './lib/classes/config.ts';
import { getAllCards, getCardById, createCard, updateCard, deleteCard, getColumns } from './lib/controllers/controller.ts';

const app = new _application();
const router = new _router();
// const send = new _send();
await loadConfig('./config.yml');

router.get('/', async (context: _context)  => {
    // TODO: Remove this after development!!!
    console.log('Server running')
    context.response.body =  await Deno.readTextFile("../YeetBoard.Frontend/index.html");
    })
    .get('/cards', getAllCards)
    .get('/cards/:id', getCardById)
    .post('/cards', createCard)
    .put('/cards', updateCard)
    .delete('/cards/:id', deleteCard)
    .get('/columns', getColumns)

app.use(router.routes());

router.get('/static/:path+', async (ctx) => {
  await _send(ctx, ctx.request.url.pathname, {
    root: "../YeetBoard.Frontend/",
  });
});

app.use(router.allowedMethods());
await app.listen({ port: configuration.port });