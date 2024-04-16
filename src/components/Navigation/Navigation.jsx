import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <>
      <NavLink to="/" className={css["header-nav-btn"]}>
        Home
      </NavLink>
      <NavLink to="/movies" className={css["header-nav-btn"]}>
        Movies
      </NavLink>
    </>
  );
};

export default Navigation;
