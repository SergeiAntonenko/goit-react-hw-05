import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import searchMovies from "../../api/searchMovies.js";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    if (searchParams.has("query")) {
      setSearchInputValue(searchParams.get("query"));
    }
  }, []);

  useEffect(() => {
    const foo = async () => {
      if (searchInputValue === "") return;
      const query = "?query=" + searchInputValue;
      setFormSubmitted(false);
      setFoundMovies([]);
      setSearchParams({ query: searchInputValue });
      setIsLoading(true);

      try {
        const res = await searchMovies(query);
        setFoundMovies(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setFormSubmitted(true);
      }
    };
    foo();
  }, [searchInputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchInputValue(e.target[0].value.toLowerCase().trim());
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css["search-form"]}>
        <input className={css["search-form-input"]} type="text" />
        <button type="submit">Search</button>
      </form>
      {isLoading && <Loader />}

      <ul className={css["movies-list"]}>
        {formSubmitted && foundMovies.length === 0 && <p>No result found</p>}

        {foundMovies.length > 0 && <MovieList movies={foundMovies} />}
      </ul>
    </div>
  );
};

export default MoviesPage;
