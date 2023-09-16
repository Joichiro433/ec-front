<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import axios from 'axios';

  let email = '';
  let password = '';

  async function handleSubmit() {
    try {
      const result = await loginUser(email, password);
      if (result) {
        goto('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  // 既存の loginUser 関数をここに追加...
  const BASE_URL = 'https://127.0.0.1:8000';
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

  async function handleButton(): Promise<void> {
    const response = await axios.get(`${BASE_URL}/api/is-logged-in`, {
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    });

    console.log(response.data, 'handleButton');
  }

  onMount(() => {
    handleButton();
  });
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />
  </div>

  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />
  </div>

  <div>
    <button type="submit">Login</button>
  </div>
</form>
