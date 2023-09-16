import axios from 'axios';
import { error } from '@sveltejs/kit';

const API_URL: string = import.meta.env.VITE_API_URL;

interface Product {
  name: string;
  description: string;
  price: number;
  author: string;
  image_url: string;
  id: string;
}

export const load = async ({ params, cookies }) => {
  try {
    const productId = params.id;
    const resp = await axios.get<Product>(`${API_URL}/products/${productId}`);
    return { product: resp.data, token: cookies.get('access_token') };
  } catch (e) {
    throw error(500, 'Error with the request');
  }
};
