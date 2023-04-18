export async function fetchMovieDetails(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6239bcc9ca30bb7c1919caac421acc81`);
    const data = await response.json();
    return data;
  }
  