import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { Card } from '../lib/classes/card.ts';
import { Repository } from '../lib/repositories/repository.ts';

let repository = new Repository();

Deno.test("Get_FromEmptyCollection_ReturnsWholeCollectionOfCards", () => {
    // Arrange
    const expected = 0;

    // Assert
    assertEquals(repository.get().length, expected)
})

Deno.test("Create_WithNewCardObject_InsertsNewCardIntoCollection", () => {
    // Arrange
    const expected = 1;
    const card: Card = {
        id: "a",
        text: "Hello, World",
        column: 1
    };
    // Act
    repository.create(card);

    // Assert
    assertEquals(repository.get(), expected);
});
