import axios from 'axios';

const API_KEY = '6239bcc9ca30bb7c1919caac421acc81';

export async function verifyCredentials(username, password) {
  const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`;
  const response = await axios.post(url, { username, password });
  const data = response.data;
  return data.success === true;
}
