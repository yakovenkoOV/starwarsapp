import React, { useState, useEffect } from "react";
import { getHeroes } from "../Services/GetHeroes";
import LoadingSpinner from "../Loading/LoadingSpinner";

export default function Heroes() {
  const [page, setPage] = useState(1);
  const [heroes, setHeroes] = useState([]);
  const [heroOnPage, setHeroesOnPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setHeroesOnPage((prevPage) => prevPage + 1);
  };
  const loadLess = () => {
    setPage((prevPage) => prevPage - 1);
    setHeroesOnPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    setHeroes([]);
    setLoading(true);
    const fetchHeroes = async () => {
      for (let i = page; i <= heroOnPage; i++) {
        try {
          const fetchedHero = await getHeroes(i);

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
          if (i === heroOnPage) {
            setLoading(false);
          }
        }
      }
    };
    fetchHeroes();
  }, [page]);
  console.log(loading);

  return (
    <div>
      {loading === true ? (
        <LoadingSpinner />
      ) : (
        <div>
          Heroes
          {page > 1 ? (
            <button onClick={loadLess}>Завантажити меньше</button>
          ) : (
            <></>
          )}
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
      )}
    </div>
  );
}
