import axios from "axios";

const apiUrl = "https://api.disneyapi.dev/character";

export const getFilteredCharacters = async (category) => {
  try {
    const res = await axios.get(apiUrl);
    const characters = res.data.data;
    const filteredCharacters = characters.filter(
      (character) =>
        Array.isArray(character[category]) && character[category].length > 0
    );
    if (!filteredCharacters || filteredCharacters.length === 0) {
      throw new Error("No characters available");
    }
    return filteredCharacters;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
