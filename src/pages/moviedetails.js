import { Flex, Box, Text, Image, Button } from '@chakra-ui/react';
import { fetchMovieDetails, fetchMovieReviews } from '../api/moviedetails';

export default function MovieDetails({ movie, reviews }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <Flex alignItems="center">
      <Box flex="1" mr="4">
        <Image src={imageUrl} alt={movie.title} />
      </Box>
      <Box flex="3">
        <Text fontSize="2xl" fontWeight="bold" mb="4">{movie.title}</Text>
        <Text fontSize="xl" mb="2">Budget: {movie.budget}€</Text>
        <Text fontSize="xl" mb="2">Actors: {movie.credits?.cast?.slice(0, 3).map(actor => actor.name).join(', ')}</Text>
        <Text fontSize="xl" mb="4">Description: {movie.overview}</Text>
        <Text fontSize="2xl" fontWeight="bold" mb="4">Reviews:</Text>
        <Box>
          {reviews.slice(0, 1).map(review => (
            <Box key={review.id} mb="2">
              <Text fontSize="xl" fontWeight="bold">{review.author}</Text>
              <Text fontSize="lg">{review.content}</Text>
            </Box>
          ))}
          {reviews.length > 1 && (
            <Button size="sm" onClick={() => alert('TODO: load more reviews')}>Load more reviews</Button>
          )}
        </Box>
      </Box>
    </Flex>
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
