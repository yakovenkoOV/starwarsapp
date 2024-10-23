import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Heroes() {
  const [page, setPage] = useState(1);
  const [heroes, setHeroes] = useState([]);
  const loadMore = () => setPage((prevPage) => prevPage + 1);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(
          `https://sw-api.starnavi.io/people/${page}`
        );
        const fetchedHero = response.data;

        setHeroes((prevHeroes) => {
          const exists = prevHeroes.some(
            (hero) =>
              hero.id === fetchedHero.id || hero.name === fetchedHero.name
          );
          if (!exists) {
            return [...prevHeroes, fetchedHero];
          }
          console.log(`Герой "${fetchedHero.name}" уже существует.`);
          return prevHeroes;
        });

        console.log(heroes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    fetchHeroes();
  }, [page]);

  return (
    <div>
      Heroes
      {heroes.map((hero) => (
        <div className="list" key={hero.id}>
          <p>{hero.name}</p>
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
            alt={hero.name}
          ></img>
        </div>
      ))}
      <button onClick={loadMore}>Завантажити більше</button>
    </div>
  );
}
