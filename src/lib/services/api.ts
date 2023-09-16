import axios from 'axios';

const BASE_URL = 'https://127.0.0.1:8000'; // 例: http://localhost:8000
// const API_URL = import.meta.env.VITE_API_URL;

export const call_api = async () => {
  const resp = await axios.get(`${BASE_URL}/`);
  console.log(resp.data);
};

export const get_products = async () => {
  const resp = await axios.get(`${BASE_URL}/products/`);
  console.log(resp.data);
};

export async function loginUser(email: string, password: string) {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error(response.data.detail || 'Unknown error occurred.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function fetchPing() {
  try {
    const response = await axios.get(`${BASE_URL}/api/ping`, { withCredentials: true });

    // response.data は { "user_id": "your_user_id" } となります。
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
    throw error;
  }
}
