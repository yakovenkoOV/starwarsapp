import React, { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";
import classNames from "classnames";
import "./Header.css";
import ChangeThemeButton from "../ChangeThemeButton/ChangeThemeButton";

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const headerBorder = classNames("header", {
    "header-border-light": theme === "light",
    "header-border-dark": theme === "dark",
  });

  return (
    <div className={headerBorder}>
      <ChangeThemeButton />
    </div>
  );
};

export default Header;
