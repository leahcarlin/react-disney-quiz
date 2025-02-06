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
  const choices = [];
  try {
    // get random choices to include in multiple choice answer
    const characters = await getFilteredCharacters(type);
    if (characters) {
      for (
        let i = 0;
        i < characters.length && choices.length < numChoices;
        i++
      ) {
        const choice = await getRandomCharacter(type, [id]);

        choices.push(choice[type][0]);
      }
    }
    // return only array of films or tvShows (not entire character)
    return choices;
  } catch (e) {
    console.error(e.message);
  }
};
