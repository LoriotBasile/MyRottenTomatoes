import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  function handleRemove(movieId) {
    const newFavorites = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }

  return (
    <div className="container">
      <h1>My Favorite Movies</h1>
      {favorites.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Release Date</th>
              <th>Popularity</th>
              <th>Overview</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {favorites.map(movieId => {
              const movie = getMovieById(movieId);
              return (
                <tr key={movie.id}>
                  <td>
                    <Link href={`/movie/${movie.id}`}>
                      <a>
                        <image src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt={`Poster for ${movie.title}`} width="700" height="500" />
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href={`/movie/${movie.id}`}>
                      <a>{movie.title}</a>
                    </Link>
                  </td>
                  <td>{movie.release_date}</td>
                  <td>{movie.popularity}</td>
                  <td>{movie.overview}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleRemove(movieId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>You haven`t added any movies to your favorites yet.</p>
      )}

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
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
        
        .btn {
          display: inline-block;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
          background-color: #dc3545;
          color: #fff;
          border: none;
          border-radius: 0.25rem;
          transition: background-color 0.3s ease;
        }
        
        .btn:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
}

function getMovieById(id) {
  // appel à l'API ou récupération depuis le store
}
