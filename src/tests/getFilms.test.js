import { default as axios } from "axios";
import { getFilms } from "../Services/GetFilms.js";

jest.mock("axios");

describe("getFilms", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    // mock console.error,
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // return console.error
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  it("film index=1", async () => {
    const index = 1;
    const data = { title: "A New Hope" };
    axios.get.mockImplementation((url) => {
      if (url === `https://sw-api.starnavi.io/films/${index}`) {
        return Promise.resolve({ data });
      }
      return Promise.reject(new Error("Not Found"));
    });

    const result = await getFilms(index);
    console.log("film index=1:", result);
    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `https://sw-api.starnavi.io/films/${index}`
    );
  });

  it("badIndex", async () => {
    const index = 999;
    const error = new Error("Not Found");
    axios.get.mockImplementation((url) => {
      if (url === `https://sw-api.starnavi.io/films/${index}`) {
        return Promise.reject(error);
      }
      return Promise.resolve({ data: { title: "Some Film" } });
    });

    await expect(getFilms(index)).rejects.toThrow("Not Found");
    expect(axios.get).toHaveBeenCalledWith(
      `https://sw-api.starnavi.io/films/${index}`
    );
    expect(console.error).toHaveBeenCalledWith("Error fetching data:", error);
  });
});
