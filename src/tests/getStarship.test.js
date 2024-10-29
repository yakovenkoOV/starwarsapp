import { default as axios } from "axios";
import { getStarship } from "../Services/GetStarship.js";

jest.mock("axios");

describe("getStarship", () => {
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

  it("starships index=9", async () => {
    const index = 9;
    const data = { name: "Death Star" };
    axios.get.mockImplementation((url) => {
      if (url === `https://sw-api.starnavi.io/starships/${index}`) {
        return Promise.resolve({ data });
      }
      return Promise.reject(new Error("Not Found"));
    });

    const result = await getStarship(index);
    console.log("starships index=9:", result);
    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `https://sw-api.starnavi.io/starships/${index}`
    );
  });

  it("badIndex", async () => {
    const index = 999;
    const error = new Error("Not Found");
    axios.get.mockImplementation((url) => {
      if (url === `https://sw-api.starnavi.io/starships/${index}`) {
        return Promise.reject(error);
      }
      return Promise.resolve({ data: { name: "Some hero" } });
    });

    await expect(getStarship(index)).rejects.toThrow("Not Found");
    expect(axios.get).toHaveBeenCalledWith(
      `https://sw-api.starnavi.io/starships/${index}`
    );
    expect(console.error).toHaveBeenCalledWith("Error fetching data:", error);
  });
});
