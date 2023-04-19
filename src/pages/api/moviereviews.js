export async function fetchMovieDetails(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos,reviews`
  );
  const data = await res.json();
  return data;
}
