import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchPopularSeries } from './api/popularseries';

export default function PopularSerie() {
  const [series, setSeries] = useState([]);
  const [likes, setLikes] = useState({});
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    async function fetchData() {
      const popularSeries = await fetchPopularSeries();
      setSeries(popularSeries);
    }
    fetchData();
  }, []);

  function handleLike(seriesId) { 
    const newLikes = { ...likes };
    newLikes[seriesId] = true;
    setLikes(newLikes);
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function handleSortChange(event) {
    setSort(event.target.value);
  }

  const filteredSeries = series
    .filter((serie) =>
      serie.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'popularity') {
        return b.popularity - a.popularity;
      } else if (sort === 'release') {
        return new Date(b.first_air_date) - new Date(a.first_air_date);
      } else {
        return 0;
      }
    });

  return (
    <div className="container">
      <div className="header">
        <Link href="/popularmovies"><h1>Popular Movies</h1></Link>
        <button className="sort-btn"></button>
        <div className="sort-options">
          <label>
            <input
              type="radio"
              value="popularity"
              checked={sort === 'popularity'}
              onChange={handleSortChange}
            />
            Popularity
          </label>
          <label>
            <input
              type="radio"
              value="release"
              checked={sort === 'release'}
              onChange={handleSortChange}
            />
            Release date
          </label>
        </div>
        <input
          type="text"
          placeholder="Search somethings"
          value={filter}
          onChange={handleFilterChange}
        />
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
          {filteredSeries.map((serie) => (
            <tr key={serie.id}>
              <td>
                <image
                  src={`https://image.tmdb.org/t/p/w92/${serie.poster_path}`}
                  alt={`Poster for ${serie.name}`}
                  width="2000"
                  height="500"
                />
              </td>
              <td>
                <Link href={`/serie/${serie.id}`} passHref>
                  <button>{serie.name}</button>
                </Link>
              </td>
              <td>{serie.first_air_date}</td>
              <td>{serie.popularity}</td>
              <td>{serie.overview}</td>
              <td>
                <button
                  disabled={likes[serie.id]}
                  onClick={() => handleLike(serie.id)}
                >
                  {likes[serie.id] ? '❤️' : '🤍'}
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
