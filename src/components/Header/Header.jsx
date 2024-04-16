import css from "./Header.module.css";
import Navigation from "../Navigation/Navigation";

const Header = () => {
  return (
    <nav className={css["header-nav"]}>
      <Navigation />
    </nav>
  );
};

export default Header;
