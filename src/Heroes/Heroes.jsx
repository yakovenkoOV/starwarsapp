import React, { useState, useEffect } from "react";
import { getHeroes } from "../Services/GetHeroes";
import LoadingSpinner from "../Loading/LoadingSpinner";
import HeroCards from "../HeroCards/HeroCards";
import Graph from "../Graph/Graph";
import "./HeroesStyle.css";

export default function Heroes() {
  const [page, setPage] = useState(1);
  const [heroes, setHeroes] = useState([]);
  const [heroOnPage, setHeroesOnPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const [showGraph, setShowGraph] = useState({
    show: false,
    id: 0,
  });

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

  return (
    <div>
      {loading === true ? (
        <LoadingSpinner />
      ) : showGraph.show === true ? (
        <Graph
          heroes={heroes}
          setShowGraph={setShowGraph}
          showGraph={showGraph}
        />
      ) : (
        <div className="heroes-container">
          <h1>Heroes</h1>
          {page > 1 ? (
            <button
              className="scroll-button scroll-button-header "
              onClick={loadLess}
            >
              Step back...
            </button>
          ) : (
            <></>
          )}
          <HeroCards heroes={heroes} setShowGraph={setShowGraph} />
          <button
            className="scroll-button scroll-button-footer"
            onClick={loadMore}
          >
            Load more...
          </button>
        </div>
      )}
    </div>
  );
}
