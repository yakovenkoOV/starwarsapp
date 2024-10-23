import React, { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";
import classNames from "classnames";
import "./ChangeThemeButtonStyle.css";

const ChangeThemeButton = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const buttonClass = classNames(
    "switch-btn",
    {
      "header-button-light": theme === "light",
      "header-button-dark": theme === "dark",
    },
    {
      "": theme === "light",
      "switch-on": theme === "dark",
    }
  );
  const textClass = classNames("side-span", {
    "side-span-light": theme === "light",
    "side-span-dark": theme === "dark",
  });

  return (
    <div className="header-button-container">
      {theme === "light" ? (
        <span className={textClass}>Light side</span>
      ) : (
        <span className={textClass}>Dark side</span>
      )}

      <button className={buttonClass} onClick={changeTheme}></button>
    </div>
  );
};

export default ChangeThemeButton;
