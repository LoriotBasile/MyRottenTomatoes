import { fetchPopularMovies } from './api/popularmovies';

export default function MyPage({ popularMovies }) {
  return (
    <div>
      {popularMovies.map(movie => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const popularMovies = await fetchPopularMovies();
  return {
    props: {
      popularMovies
    }
  }
}
