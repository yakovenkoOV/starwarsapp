import { default as axios } from "axios";
import { getHeroes } from "../Services/GetHeroes.js";

jest.mock("axios");

describe("getHero", () => {
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

  it("hero index=1", async () => {
    const index = 1;
    const data = { name: "Luke Skywalker" };
    axios.get.mockImplementation((url) => {
      if (url === `https://sw-api.starnavi.io/people/${index}`) {
        return Promise.resolve({ data });
      }
      return Promise.reject(new Error("Not Found"));
    });

    const result = await getHeroes(index);
    console.log("hero index=1:", result);
    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `https://sw-api.starnavi.io/people/${index}`
    );
  });

  it("badIndex", async () => {
    const index = 999;
    const error = new Error("Not Found");
    axios.get.mockImplementation((url) => {
      if (url === `https://sw-api.starnavi.io/people/${index}`) {
        return Promise.reject(error);
      }
      return Promise.resolve({ data: { name: "Some hero" } });
    });

    await expect(getHeroes(index)).rejects.toThrow("Not Found");
    expect(axios.get).toHaveBeenCalledWith(
      `https://sw-api.starnavi.io/people/${index}`
    );
    expect(console.error).toHaveBeenCalledWith("Error fetching data:", error);
  });
});
