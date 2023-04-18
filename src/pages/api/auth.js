import axios from 'axios';

const API_KEY = '6239bcc9ca30bb7c1919caac421acc81';

export async function verifyCredentials(username, password) {
  try {
    // Step 1: Get a request token
    const url1 = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`;
    const response1 = await axios.get(url1);
    const requestToken = response1.data.request_token;

    // Step 2: Validate the username and password with the request token
    const url2 = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`;
    const body = {
      username: username,
      password: password,
      request_token: requestToken,
    };
    await axios.post(url2, body);

    // Step 3: Get a session ID using the request token
    const url3 = `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`;
    const body2 = { request_token: requestToken };
    const response3 = await axios.post(url3, body2);
    const sessionId = response3.data.session_id;

    // Step 4: Get the account details using the session ID
    const url4 = `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`;
    const response4 = await axios.get(url4);
    const accountId = response4.data.id;

    return { sessionId: sessionId, accountId: accountId };
  } catch (error) {
    console.log(error);
    return false;
  }
}
