import { fetchMovieDetails, fetchMovieReviews } from '../api/moviedetails';

export default function MovieDetails({ movie, reviews }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <div className="movie-details-container">
      <div className="movie-details-image-container">
        <img src={imageUrl} alt={movie.title} className="movie-details-image" />
      </div>
      <div className="movie-details-content-container">
        <h1>{movie.title}</h1>
        <p>Budget: {movie.budget}€</p>
        <p>Actors: {movie.credits?.cast?.slice(0, 3).map(actor => actor.name).join(', ')}</p>
        <p>Description: {movie.overview}</p>
        <h2>Reviews:</h2>
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const movie = await fetchMovieDetails(id);
  const reviews = await fetchMovieReviews(id);
  return {
    props: {
      movie,
      reviews,
    },
  };
}
