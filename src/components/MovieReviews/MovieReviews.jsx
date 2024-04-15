import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import getMovieDetails from "../../api/getMovieDetails";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const data = await getMovieDetails(
          `/${movieId}/reviews?language=en-US&page=1`
        );

        setReviews(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}

      <ul>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <li key={review.id}>
                <p className={css.reviewTitle}>{review.author}</p>
                <p className={css.noReview}>{review.content}</p>
              </li>
            );
          })
        ) : (
          <p className={css.noReview}>Oooops, no reviews for this movie</p>
        )}
      </ul>
    </>
  );
};

export default MovieReviews;
