import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '6239bcc9ca30bb7c1919caac421acc81';

export async function fetchPopularSeries() {
  const url = `${API_BASE_URL}/tv/popular?api_key=${API_KEY}`;
  const response = await axios.get(url);
  const series = response.data.results;
  return series;
}

export async function fetchSeriesDetails(seriesId) {
  const url = `${API_BASE_URL}/tv/${seriesId}?api_key=${API_KEY}`;
  const response = await axios.get(url);
  const seriesDetails = response.data;
  return seriesDetails;
}

export async function fetchSeriesReviews(seriesId) {
  const url = `${API_BASE_URL}/tv/${seriesId}/reviews?api_key=${API_KEY}`;
  const response = await axios.get(url);
  const seriesReviews = response.data.results;
  return seriesReviews;
}
