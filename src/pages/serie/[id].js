import { Badge, Box, Button, Container, Divider, Flex, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { fetchSerieDetails, fetchSerieReviews } from "../api/seriedetails";

export default function SerieDetails({ serie, reviews }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${serie.poster_path}`;

  return (
    <Container maxW="container.lg" mt={10}>
      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <Image src={imageUrl} alt={serie.name} w="full" />
        </Box>
        <Box>
          <Heading as="h1" size="lg" mb={4}>{serie.name}</Heading>
          <Text fontSize="lg" mb={6}>{serie.overview}</Text>
          <Flex alignItems="center">
            <Badge colorScheme="green" fontSize="md" mr={2}>Actors:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{serie.credits?.cast?.slice(0, 3).map(actor => actor.name).join(', ')}</Text>
          </Flex>
          <Flex alignItems="center">
            <Badge colorScheme="purple" fontSize="md" mr={2}>Number of seasons:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{serie.number_of_seasons}</Text>
          </Flex>
          <Flex alignItems="center">
            <Badge colorScheme="purple" fontSize="md" mr={2}>Number of episodes:</Badge>
            <Text fontWeight="semibold" fontSize="md" mb={2}>{serie.number_of_episodes}</Text>
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
  const serie = await fetchSerieDetails(id);
  const reviews = await fetchSerieReviews(id);
  return {
    props: {
      serie,
      reviews,
    },
  };
}
