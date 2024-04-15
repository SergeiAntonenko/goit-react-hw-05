import { Link, useLocation } from "react-router-dom";

import css from "./MovieList.module.css";

const noImage = "https://critics.io/img/movies/poster-placeholder.png";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <>
      {movies.map((movie) => (
        <li key={movie.id} className={css["list-li"]}>
          <Link
            to={`/movie/${movie.id}`}
            className={css["list-item"]}
            state={location}
          >
            <h4 className={css["list-title"]}>{movie.title}</h4>
            <img
              className={css["list-img"]}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : noImage
              }
              alt={movie.title}
            />
          </Link>
        </li>
      ))}
    </>
  );
};

export default MovieList;
