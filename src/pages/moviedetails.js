import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchMovieDetails } from '../../api/moviedetails';

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const { movieId } = router.query;
      const movieDetails = await fetchMovieDetails(movieId);
      setMovie(movieDetails);
    }
    fetchData();
  }, [router.query]);

  return (
    <div className="container">
      <div className="movie-details">
        <div className="movie-image">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>Budget: {movie.budget}</p>
          <p>Description: {movie.overview}</p>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
        }

        .movie-details {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .movie-image {
          flex-basis: 40%;
          margin-right: 2rem;
        }

        .movie-image img {
          width: 100%;
          height: auto;
        }

        .movie-info {
          flex-basis: 55%;
        }

        h1 {
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
