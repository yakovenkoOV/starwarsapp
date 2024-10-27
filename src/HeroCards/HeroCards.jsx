import React from "react";
import HeroCardItem from "./HeroCardItem";
import "./HeroCardsStyle.css";

const HeroCards = ({ heroes = [], setShowGraph }) => {
  return (
    <div className="hero-card-container">
      {heroes.map((hero) => (
        <HeroCardItem hero={hero} setShowGraph={setShowGraph} />
      ))}
    </div>
  );
};

export default HeroCards;
