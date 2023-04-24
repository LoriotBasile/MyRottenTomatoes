import { Badge, Box, Button, Container, Divider, Flex, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { fetchMovieDetails, fetchMovieReviews } from "../api/moviedetails";

export default function MovieDetails({ movie, reviews }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <Container maxW="container.lg" mt={10}>
      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <Image src={imageUrl} alt={movie.title} w="full" />
        </Box>
        <Box>
          <Heading as="h1" size="lg" mb={4}>{movie.title}</Heading>
          <Text fontSize="lg" mb={6}>{movie.overview}</Text>
          <Flex alignItems="center">
            <Badge colorScheme="green" fontSize="md" mr={2}>Actors:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{movie.credits?.cast?.slice(0, 3).map(actor => actor.name).join(', ')}</Text>
          </Flex>
          <Flex alignItems="center">
            <Badge colorScheme="purple" fontSize="md" mr={2}>Budget:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{movie.budget}€</Text>
          </Flex>
          <Flex alignItems="center">
            <Badge colorScheme="teal" fontSize="md" mr={2}>Release Date:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{movie.release_date}</Text>
          </Flex>
          <Flex alignItems="center">
            <Badge colorScheme="orange" fontSize="md" mr={2}>Runtime:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{movie.runtime} min</Text>
          </Flex>
          <Flex alignItems="center">
            <Badge colorScheme="blue" fontSize="md" mr={2}>Genres:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{movie.genres?.map(genre => genre.name).join(', ')}</Text>
          </Flex>
          <Flex alignItems="center">
            <Badge colorScheme="yellow" fontSize="md" mr={2}>Language:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{movie.original_language}</Text>
          </Flex>
          <Flex alignItems="center">
            <Badge colorScheme="red" fontSize="md" mr={2}>Production:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{movie.production_countries?.map(country => country.name).join(', ')}, {movie.production_companies?.map(company => company.name).join(', ')}</Text>
          </Flex>
        </Box>
      </SimpleGrid>
      <Divider my={10} />
      <VStack align="stretch" spacing={8}>
        <Heading as="h2" size="md" mb={4}>Reviews:</Heading>
        {reviews.slice(0, 3).map(review => (
          <Box key={review.id} borderWidth="1px" borderColor="gray.200" borderRadius="md" p={4}>
            <Heading as="h3" size="md" mb={2}>{review.author}</Heading>
            <Text fontSize="md" mb={2}>{review.content}</Text>
            <Badge colorScheme="gray" fontSize="sm">Source: {review.url}</Badge>
          </Box>
        ))}
        {reviews.length > 3 &&
          <Button colorScheme="red" size="lg" my={6}>Voir toutes les reviews</Button>
        }
      </VStack>
    </Container>
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
