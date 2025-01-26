import axios from "axios";

const apiUrl = "https://api.disneyapi.dev/character";

export const getFilteredCharacters = async (type) => {
  const apiUrl = "https://api.disneyapi.dev/character";
  try {
    const res = await axios.get(apiUrl);
    const characters = res.data.data;

    const filteredCharacters = characters.filter(
      (character) =>
        Array.isArray(character[type]) && character[type].length > 0
    );
    console.log("filtered", filteredCharacters);
    return filteredCharacters;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getRandomCharacter = async (type) => {
  const randomId = Math.floor(Math.random() * (7000 - 10 + 1)) + 10;
  try {
    const res = await getFilteredCharacters(type);
    if (res) {
      const randomCharacter = res.find(
        (character) => (character._id = randomId)
      );
      console.log("random", randomCharacter);
      return randomCharacter;
    } else throw new Error("Character not found");
  } catch (e) {
    console.error(e.message);
  }
};
