import axios from "axios";

const apiUrl = "https://api.disneyapi.dev/character";

export const getFilteredCharacters = async (type) => {
  try {
    const res = await axios.get(apiUrl);
    const characters = res.data.data;
    const filteredCharacters = characters.filter(
      (character) =>
        Array.isArray(character[type]) && character[type].length > 0
    );
    return filteredCharacters;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getRandomCharacter = async (type, usedCharacterIds) => {
  try {
    const filteredCharacters = await getFilteredCharacters(type);

    if (!filteredCharacters || filteredCharacters.length === 0) {
      throw new Error("No characters available");
    }

    // filter out characters that have already been used
    const availableCharacters = filteredCharacters.filter(
      (character) => !usedCharacterIds.includes(character._id)
    );

    if (availableCharacters.length === 0) {
      throw new Error("No available characters left to select");
    }

    // pick a random character from the available list
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    return availableCharacters[randomIndex];
  } catch (e) {
    console.error(e.message);
  }
};

export const getRandomChoices = async (type, id) => {
  const numChoices = 3;
  const choices = new Set();

  try {
    const characters = await getFilteredCharacters(type);

    if (characters) {
      while (choices.size < numChoices) {
        const choice = await getRandomCharacter(type, [id]);

        // ensure no duplicates
        if (choice._id !== id && !choices.has(choice[type][0])) {
          choices.add(choice[type][0]);
        }
      }
    }
    console.log(Array.from(choices));
    return Array.from(choices); // convert Set back to Array before returning
  } catch (e) {
    console.error(e.message);
  }
};
