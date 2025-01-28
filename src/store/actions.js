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

export const getRandomCharacter = async (type) => {
  try {
    const filteredCharacters = await getFilteredCharacters(type);
    const randomIndex = Math.floor(Math.random() * filteredCharacters.length);
    if (filteredCharacters) {
      const randomCharacter = filteredCharacters[randomIndex];
      return randomCharacter;
    } else throw new Error("Character not found");
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
        let choice = await getRandomCharacter(type);
        // check if random choice is same as displayed character
        while (choice._id === id) {
          choice = await getRandomCharacter(type);
        }

        choices.push(choice[type][0]);
      }
      // return only array of films or tvShows (not entire character)
      console.log("return chocies");
      return choices;
    } else throw new Error("Unable to fetch random choices");
  } catch (e) {
    console.error(e.message);
  }
};
