export class Characters {
  constructor(characters) {
    this.characters = characters;
    this.usedCharacterIds = [];
  }

  getCharacters() {
    return this.characters;
  }

  getRandomCharacter() {
    // filter out characters that have already been used
    const availableCharacters = this.characters.filter(
      (character) => !this.usedCharacterIds.includes(character._id)
    );

    if (availableCharacters.length === 0) {
      throw new Error("No available characters left to select");
    }

    // pick a random character from the available list
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    return availableCharacters[randomIndex];
  }

  getRandomChoices(type, id) {
    const numChoices = 3;
    const choices = new Set();

    while (choices.size < numChoices) {
      const choice = this.getRandomCharacter([id]);
      const currentCharacter = this.characters.find((char) => char._id === id);

      // ensure no duplicates
      if (
        choice._id !== id &&
        !choices.has(choice[type][0]) &&
        choice[type][0] !== currentCharacter[type][0]
      ) {
        choices.add(choice[type][0]);
      }
    }
    return Array.from(choices); // convert Set back to Array before returning
  }

  addUsedCharacterId(id) {
    this.usedCharacterIds.push(id);
    return this;
  }
}
