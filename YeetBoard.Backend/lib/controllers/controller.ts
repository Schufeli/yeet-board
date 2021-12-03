import { Repository } from '../repositories/repository.ts';
import { _context } from '../../deps.ts';
import { Card } from '../classes/card.ts';

const cardRepository = new Repository();

export const getAllCards = ({ response }: { response: any }) => {
    response.body = cardRepository.get();
}

export const getCardById = ({ params, response }: { params: { id: string }; response: any }) => {
    response.body = cardRepository.find(params.id);
}

export const createCard = async ({ request, response }: { request: any; response: any }) => {
    const card: Card = await request.body().value;
    cardRepository.add(card);
    response.status = 201;
    response.body = card;
}