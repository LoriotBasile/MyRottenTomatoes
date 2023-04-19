export async function fetchMovieDetails(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6239bcc9ca30bb7c1919caac421acc81`);
    const data = await response.json();
    return data;
  }

  export async function fetchMovieReviews(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=6239bcc9ca30bb7c1919caac421acc81&language=en-US`);
    const reviews = await response.json();
    return reviews.results;
  }
  