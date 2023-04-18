import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchPopularMovies } from './api/popularmovies';

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [likes, setLikes] = useState({});
  
  useEffect(() => {
    async function fetchData() {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    }
    fetchData();
  }, []);

  function handleLike(movieId) {
    const newLikes = { ...likes };
    newLikes[movieId] = true;
    setLikes(newLikes);
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Popular Movies</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Popularity</th>
            <th>Overview</th>
            <th><Link href="/my-favorites">
  <span className="favorites-link">❤️</span>
</Link></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <img
                  src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                  alt={`Poster for ${movie.title}`}
                  width="700"
                  height="500"
                />
              </td>
              <td>
                <Link href={`/movie/${movie.id}`} passHref>
                  <button>{movie.title}</button>
                </Link>
              </td>
              <td>{movie.release_date}</td>
              <td>{movie.popularity}</td>
              <td>{movie.overview}</td>
              <td>
                <button
                  disabled={likes[movie.id]}
                  onClick={() => handleLike(movie.id)}
                >
                  {likes[movie.id] ? '❤️' : '🤍'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .favorites-link {
          text-decoration: none;
          color: #333;
          padding: 0.5rem;
          border: 1px solid #333;
          border-radius: 5px;
        }

        .favorites-link:hover {
          background-color: #333;
          color: #fff;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #333;
        }

        .table th {
          text-align: left;
          padding: 0.5rem;
          background-color: #ddd;
          font-weight: bold;
        }

        .table td {
          padding: 0.5rem;
          border: 1px solid #ddd;
        }

        .table td img {
          display: block;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
