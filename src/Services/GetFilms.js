import axios from "axios";

const api = "https://sw-api.starnavi.io/films";

export const getFilms = async (index) => {
  try {
    const response = await axios.get(`${api}/${index}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
