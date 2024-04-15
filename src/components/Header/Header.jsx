import { NavLink } from "react-router-dom";

import css from "./Header.module.css";

const Header = () => {
  return (
    <nav className={css["header-nav"]}>
      <NavLink to="/" className={css["header-nav-btn"]}>
        Home
      </NavLink>
      <NavLink to="/movies" className={css["header-nav-btn"]}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Header;
