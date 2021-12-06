import { Repository } from '../repositories/repository.ts';
import { _context, _uuid } from '../../deps.ts';
import { Card } from '../classes/card.ts';
import { configuration } from '../classes/config.ts';

const cardRepository = new Repository();

export const getAllCards = ({ response }: { response: any }) => {
    response.body = cardRepository.get();
}

export const getCardById = ({ params, response }: { params: { id: string }; response: any }) => {
    response.body = cardRepository.find(params.id);
}

export const createCard = async ({ request, response }: { request: any; response: any }) => {
    const card: Card = await request.body().value;
    card.id = _uuid.generate();
    cardRepository.add(card);
    response.status = 201;
    response.body = card;
}

export const updateCard = async ({ request, response }: { request: any; response: any }) => {
    const card: Card = await request.body().value;
    console.log(card)
    cardRepository.update(card);
    response.status = 200;
    response.body = card;
}

export const deleteCard = ({ params, response }: { params: { id: string }; response: any }) => {
    cardRepository.delete(params.id);
    response.status = 200;
}

export const getColumns = ({ response }: { response: any }) => {
    response.body = configuration.columns;
}