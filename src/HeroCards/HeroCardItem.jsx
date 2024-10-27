import React, { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";
import classNames from "classnames";
import "./CardItemStyle.css";

const HeroCardItem = ({ hero = {}, setShowGraph }) => {
  const { theme } = useContext(ThemeContext);
  const cardStyle = classNames("card", {
    "card-border-light": theme === "light",
    "card-border-dark": theme === "dark",
  });

  function handelShowGraph(e) {
    setShowGraph({
      show: true,
      id: e.target.dataset.id,
    });
  }

  return (
    <>
      <div className={cardStyle} data-id={hero.id} onClick={handelShowGraph}>
        <h2 data-id={hero.id}>{hero.name}</h2>
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
          alt={hero.name}
          data-id={hero.id}
        ></img>
        <p data-id={hero.id}>Gender: {hero.gender}</p>
        <p data-id={hero.id}>Birth: {hero.birth_year}</p>
        <p data-id={hero.id}>Eye: {hero.eye_color}</p>
      </div>
    </>
  );
};

export default HeroCardItem;
