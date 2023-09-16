import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({ baseURL: API_URL });

const get = async (url: string, { request, token }: { request?: object; token?: string } = {}) => {
  const config = {
    params: request,
    withCredentials: true,
    headers: {
      accept: 'application/json',
      cookie: token ? `access_token=${token}` : undefined,
    },
  };
  const resp = await axiosInstance.get(url, config);
  return resp.data;
};

const post = async (
  url: string,
  data: object,
  { request, token, contentType }: { request?: object; token?: string; contentType?: string } = {},
) => {
  const config = {
    params: request,
    withCredentials: true,
    headers: {
      accept: 'application/json',
      cookie: token ? `access_token=${token}` : undefined,
      'Content-Type': contentType ? contentType : 'application/json;charset=utf-8',
    },
  };
  const resp = await axiosInstance.post(url, data, config);
  return resp.data;
};

const Api = {
  get,
  post,
};

export default Api;
