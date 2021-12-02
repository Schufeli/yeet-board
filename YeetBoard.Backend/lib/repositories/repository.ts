import { Card } from '../classes/card.ts';

export class Repository<Card> {
    private _collection: Card[] = []

    /**
     * Get all elements
     * @returns Entire collection
     */
    public get() {
        return this._collection;
    }

    public find(id: string) {
        throw new Error("Method not implemented.");
    }

    public create(card: Card) {
        this._collection.push(card);
    }

    public update(card: Card) {
        throw new Error("Method not implemented.");
    }

    public delete(id: string) {
        throw new Error("Method not implemented.");
    }
}