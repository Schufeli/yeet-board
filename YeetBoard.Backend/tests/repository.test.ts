import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { Card } from '../lib/classes/card.ts';
import { Repository } from '../lib/repositories/repository.ts';

const repository = new Repository();


function setup() {
    // Create initial card and add it to repository
    const card: Card = {
        id: "a",
        text: "Hello, World",
        column: 1
    };
    repository.add(card);
}
setup();

Deno.test("Get_FromRepository_ReturnsWholeCollectionOfCards", () => {
    // Arrange
    const expected = 1;

    // Assert
    assertEquals(repository.get().length, expected)
})

Deno.test("Find_WithIdOfCard_FindsAndReturnsSingleCardFromRepository", () => {
    // Arrange
    const expectedId = "a"

    // Assert
    assertEquals(repository.find(expectedId)!.id, expectedId)
});

Deno.test("Add_WithNewCardObject_InsertsNewCardIntoRepository", () => {
    // Arrange
    const expected = 2;
    const card: Card = {
        id: "b",
        text: "Hello, World",
        column: 1
    };

    // Act
    repository.add(card);

    // Assert
    assertEquals(repository.get().length, expected);
});

Deno.test("Update_WithExistingCardObject_UpdatesExistingCardInRepository", () => {
    // Arrange
    const id = "a";
    const expectedText = "abcd";
    const expectedColumn = 2;

    const updatedCard: Card = {
        id: "a",
        text: expectedText,
        column: expectedColumn
    };

    // Act
    repository.update(updatedCard);
    const card = repository.find(id);

    // Assert
    assertEquals(card!.text, expectedText); // Assert text change
    assertEquals(card!.column, expectedColumn); // Assert column change
});

Deno.test("Delete_WithIdOfCard_RemoveSpecifiedCardFromRepository", () => {
    // Arrange
    const id = "a";

    // Act
    repository.delete(id);
    const card = repository.find(id);

    // Assert
    assertEquals(card, undefined); // Assert that result of find() method is undefined equal to Element not found
});
