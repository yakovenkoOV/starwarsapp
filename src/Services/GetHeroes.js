// import axios from "axios";
import { default as axios } from "axios";

const api = "https://sw-api.starnavi.io/people";

export const getHeroes = async (index) => {
  try {
    const response = await axios.get(`${api}/${index}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
