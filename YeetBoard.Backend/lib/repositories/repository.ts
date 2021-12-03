import { Card } from '../classes/card.ts';

export class Repository {
    private _collection: Card[] = []

    /**
     * Get all elements
     * @returns Entire collection
     */
    public get() {
        return this._collection;
    }

    /**
     * Finds and returns card specified by Id
     * @param id Id of Card
     */
    public find(id: string) {
        return this._collection.find(element => element.id == id);
    }

    /**
     * Adds a new card to the collection
     * @param card Card object
     */
    public add(card: Card) {
        card.id;
        this._collection.push(card);
    }

    /**
     * Updated existing card object in collection
     * @param card Card object
     */
    public update(card: Card) {
        const index = this._collection.findIndex(element => element.id == card.id);
        this._collection[index] = card;
    }

    /**
     * Remove existing card object from collection
     * @param id Id of card
     */
    public delete(id: string) {
        const index = this._collection.findIndex(element => element.id == id);
        this._collection.splice(index, 1);
    }
}