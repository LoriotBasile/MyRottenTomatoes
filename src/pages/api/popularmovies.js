import axios from 'axios';

const API_KEY = '6239bcc9ca30bb7c1919caac421acc81';
const API_URL = 'https://api.themoviedb.org/3';

async function fetchPopularMovies() {
  const response = await axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  console.log(response.data.results)
  return response.data.results;
}

export { fetchPopularMovies };