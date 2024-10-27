import { getStarship } from "../Services/GetStarship";
import { getFilms } from "../Services/GetFilms";

const createGraphObj = async (hero) => {
  try {
    //CORS (Cross-Origin Resource Sharing). Це обмеження безпеки браузера, яке забороняє запити з одного домену
    // const hasStarships =
    //   Array.isArray(hero.starships) && hero.starships.length > 0;
    // const hasFilms = Array.isArray(hero.films) && hero.films.length > 0;

    // const starshipPromises = hasStarships
    //   ? hero.starships.map((id) => getStarship(id))
    //   : [];
    // const filmPromises = hasFilms ? hero.films.map((id) => getFilms(id)) : [];

    // const [heroStarShips, heroFilms] = await Promise.all([
    //   Promise.all(starshipPromises),
    //   Promise.all(filmPromises),
    // ]);

    let heroFilms = [];
    let heroStarShips = [];
    //fetch hero starships
    if (hero.starships.length > 0) {
      for (const element of hero.starships) {
        try {
          let fetchedStarship = await getStarship(element);
          heroStarShips.push(fetchedStarship);
        } catch (error) {
          console.error("Помилка під час отримання даних:", error);
        }
      }
    }
    //fetch hero films
    if (hero.films.length > 0) {
      for (const element of hero.films) {
        try {
          let fetchedFilm = await getFilms(element);
          heroFilms.push(fetchedFilm);
        } catch (error) {
          console.error("Помилка під час отримання даних:", error);
        }
      }
    }

    //heroObjectBase
    let graphHero = {
      id: hero.id,
      name: hero.name,
      films: [],
    };

    heroFilms.forEach((film) => {
      let objFilm = {
        id: film.id + 100,
        title: film.title,
        spaceships: [],
      };
      heroStarShips.forEach((starship) => {
        if (film.starships.includes(starship.id)) {
          let objShip = {
            id: starship.id + 1000,
            name: starship.name,
          };
          objFilm.spaceships.push(objShip);
        }
      });
      graphHero.films.push(objFilm);
    });

    return graphHero;
  } catch (error) {
    console.error("Помилка під час створення графа:", error);
    return null;
  }
};

export default createGraphObj;
