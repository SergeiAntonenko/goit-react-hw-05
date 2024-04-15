import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import getMovieDetails from "../../api/getMovieDetails.js";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(
          `/${movieId}/credits?language=en-US'`
        );

        setCast(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [movieId]);
  console.log(cast);
  const noImage = "https://critics.io/img/movies/poster-placeholder.png";

  return (
    <>
      {isLoading && <Loader />}

      <ul className={css.castList}>
        {cast &&
          Array.isArray(cast) &&
          cast.map((actor) => {
            return (
              <li className={css.castCard} key={actor.id}>
                <img
                  className={css.castPhoto}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : noImage
                  }
                  alt={actor.title}
                />
                <p className={css.castName}>{actor.name}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MovieCast;
