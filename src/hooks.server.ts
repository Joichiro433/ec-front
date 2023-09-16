import axios from 'axios';
import * as https from 'https';
import type { Handle } from '@sveltejs/kit';
import Api from '$lib/api';

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const API_URL: string = import.meta.env.VITE_API_URL;

async function isLoginedIn(token: any) {
  try {
    const response = await axios.get(`${API_URL}/is-logged-in`, {
      withCredentials: true,
      headers: {
        accept: 'application/json',
        cookie: `access_token=${token}`,
      },
    });
    if (response.status === 200 && response.data.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error);
    return false;
  }
}

const getUser = async (token: any) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      withCredentials: true,
      headers: {
        accept: 'application/json',
        cookie: `access_token=${token}`,
      },
    });
    return response.data;
  } catch (e) {
    // console.log(e);
    return;
  }
};

export const handle: Handle = async ({ event, resolve }) => {
  console.log('HI! hooks');

  const token = event.cookies.get('access_token');

  // const resp2 = await Api.get('/user', { token: token });
  // console.log(resp2, 'response2 Api');

  const status = await isLoginedIn(token);
  const user = await getUser(token);
  // console.log(status);
  event.locals.isLoggedIn = status;
  event.locals.user = user;

  return await resolve(event);
};
