import { useState, useEffect } from "react";

import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import fetchMovies from "../../api/getMovies.js";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const resData = await fetchMovies();
        setMovies(resData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css["title"]}>Trending today</h1>
      {isLoading && <Loader />}
      <ul className={css["movies-list"]}>
        <MovieList movies={movies} />
      </ul>
    </div>
  );
};

export default HomePage;
