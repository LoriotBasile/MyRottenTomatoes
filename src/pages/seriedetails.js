import { fetchSerieDetails, fetchSerieReviews } from './api/seriedetails';

export default function TVDetails({ tv, reviews }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;

  return (
    <div className="tv-details-container">
      <div className="tv-details-image-container">
        <image src={imageUrl} alt={tv.name} className="tv-details-image" />
      </div>
      <div className="tv-details-content-container">
        <h1>{tv.name}</h1>
        <p>First Air Date: {tv.first_air_date}</p>
        <p>Last Air Date: {tv.last_air_date}</p>
        <p>Networks: {tv.networks?.map(network => network.name).join(', ')}</p>
        <p>Number of Seasons: {tv.number_of_seasons}</p>
        <p>Number of Episodes: {tv.number_of_episodes}</p>
        <p>Description: {tv.overview}</p>
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
  const tv = await fetchSerieDetails(id);
  const reviews = await fetchSerieReviews(id);
  return {
    props: {
      tv,
      reviews,
    },
  };
}
