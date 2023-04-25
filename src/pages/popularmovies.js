import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchPopularMovies } from './api/popularmovies';
import Image from 'next/image'
import { Link as ChakraLink, Button, Flex, Icon } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [likes, setLikes] = useState({});
  const [sortBy, setSortBy] = useState('popularity'); // default sort by popularity
  const [searchTerm, setSearchTerm] = useState('');

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

  function handleSortBy(event) {
    setSortBy(event.target.value);
  }

  function getSortedMovies() {
    const sortedMovies = [...movies];
    if (sortBy === 'popularity') {
      sortedMovies.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'release-date') {
      sortedMovies.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateB - dateA;
      });
    }
    return sortedMovies.filter(movie => {
      const title = movie.title.toLowerCase();
      const overview = movie.overview.toLowerCase();
      return title.includes(searchTerm.toLowerCase()) || overview.includes(searchTerm.toLowerCase());
    });
  }

  return (
    <div className="container">
      <div className="header">
      <Flex>
  <ChakraLink as={Link} href="/login">
    <Button
      leftIcon={<Icon as={FaUser} />}
      colorScheme="blue"
      variant="solid"
      size="md"
    >
      Login
    </Button>
  </ChakraLink>
</Flex>
        <Link href="/popularmovies"><h1>Popular Movies</h1></Link>
        <Link href="/popularseries"><h1>Popular Series</h1></Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="sort-by">
        <label></label>
        <select value={sortBy} onChange={handleSortBy}>
          <option value="popularity">Popularity</option>
          <option value="release-date">Release Date</option>
        </select>
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
          {getSortedMovies().map((movie) => (
            <tr key={movie.id}>
              <td>
                <Image
                  src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                  alt={`Poster for ${movie.title}`}
                  width="700"
                  height="500"
                />
              </td>
              <td>
                <Link href={`/movie/${movie.id}`}>
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
