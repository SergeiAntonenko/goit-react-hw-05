import { lazy, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import getMovieDetails from "../../api/getMovieDetails";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

const noImage = "https://critics.io/img/movies/poster-placeholder.png";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movieById, setMovieById] = useState([]);
  const location = useLocation();

  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const res = await getMovieDetails(movieId);
        setMovieById(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
      <Link to={backLinkRef.current} className={css["goback-btn"]}>
        GO BACK
      </Link>
      <div className={css["movie-container"]}>
        <img
          className={css["details-img"]}
          src={
            movieById.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieById.poster_path}`
              : noImage
          }
          alt={`${movieById.title}`}
        />
        <div className={css["movie-description"]}>
          <h2 className={css["movie-title"]}>{movieById.title}</h2>
          <div>
            <h3 className={css["movie-title"]}>Genres:</h3>
            {movieById.genres && (
              <>
                {movieById.genres.map((genre, index) => (
                  <p key={index} className={css["movie-title"]}>
                    {genre.name}
                  </p>
                ))}
              </>
            )}
          </div>
          <div>
            <h3 className={css["movie-title"]}>Overview</h3>
            {movieById.overview && (
              <p className={css["movie-title"]}>{movieById.overview}</p>
            )}
          </div>
        </div>
      </div>
      <div className={css["cast-container"]}>
        <Link className={css["cast-link"]} to="cast">
          Cast
        </Link>
        <Link className={css["cast-link"]} to="reviews">
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
