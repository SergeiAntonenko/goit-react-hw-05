import axios from "axios";

const url = `https://api.themoviedb.org/3/search/movie`;
const apiToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjc0NzY4YjY4ZDAwMGQ2MTIyOWMxZTJmZTBlMjBlNyIsInN1YiI6IjY2MWE0MmQzOTc2YTIzMDE3YjI5NmRhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hyHsJI4vr9inlAuLMyoxCQYDwEJGIekbW3fZkoNe7BQ";
const options = {
  headers: {
    Authorization: `Bearer ${apiToken}`,
  },
};

const searchMovies = async (query) => {
  try {
    const response = await axios.get(url + query, options);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export default searchMovies;
