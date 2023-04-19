import { fetchSerieDetails, fetchSerieReviews } from '../api/seriedetails';

export default function SerieDetails({ serie, reviews }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${serie.poster_path}`;

  return (
    <div className="serie-details-container">
      <div className="serie-details-image-container">
        <img src={imageUrl} alt={serie.name} className="serie-details-image" />
      </div>
      <div className="serie-details-content-container">
        <h1>{serie.name}</h1>
        <p>Seasons: {serie.number_of_seasons}</p>
        <p>Episodes: {serie.number_of_episodes}</p>
        <p>Description: {serie.overview}</p>
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
  const serie = await fetchSerieDetails(id);
  const reviews = await fetchSerieReviews(id);
  return {
    props: {
      serie,
      reviews,
    },
  };
}
