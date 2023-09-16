<script lang="ts">
  import axios from 'axios';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  const BASE_URL = 'https://127.0.0.1:8000';

  let isLoggedIn = false;
  let user = 'unknown';

  async function checkLoginStatus() {
    try {
      const response = await axios.get(`${BASE_URL}/api/is-logged-in`, {
        withCredentials: true,
        headers: {
          accept: 'application/json',
        },
      });
      console.log(response.data.isLoggedIn, 'header');
      if (response.status === 200 && response.data.isLoggedIn) {
        isLoggedIn = true;

        const resp = await axios.get(`${BASE_URL}/api/user`, {
          withCredentials: true,
          headers: {
            accept: 'application/json',
          },
        });
        user = resp.data.email;
      } else {
        isLoggedIn = false;
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      isLoggedIn = false;
    }
  }

  onMount(checkLoginStatus);
</script>

<head>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<header id="header">
  <img src="ec_logo.svg" alt="Logo" />
  <input type="checkbox" class="menu-toggle" id="menu-toggle" />
  <nav class="header">
    <div class="search-box">
      <input type="text" placeholder="Search for Products" />
      <button><i class="fas fa-search" /></button>
    </div>
    <ul>
      <li>
        <a class:active={$page.url.pathname === '/'} href="/">
          <i class="fa-solid fa-shop" /> Store
        </a>
      </li>
      {#if isLoggedIn}
        <li>
          <a class:active={$page.url.pathname === '/orders'} href="/orders">
            <i class="fa-solid fa-clock" /> Orders
          </a>
        </li>
      {/if}
      {#if isLoggedIn}
        <li>
          <a class:active={$page.url.pathname === '/login'} href="/login">
            <i class="fa-solid fa-user" />
            {user.length > 13 ? `${user.substring(0, 10)}...` : user}
          </a>
        </li>
      {:else}
        <li>
          <a class:active={$page.url.pathname === '/login'} href="/login">
            <i class="fa-solid fa-door-closed" /> Login
          </a>
        </li>
      {/if}
      <li>
        <a class:active={$page.url.pathname === '/cart'} href="/cart">
          <i class="fa-solid fa-cart-shopping" /> Cart
        </a>
      </li>
    </ul>
  </nav>
  <label for="menu-toggle" class="menu-nav-toggle">
    <span />
  </label>
</header>

<style>
  header {
    text-align: center;
    width: 100%;
    z-index: 999;
    position: fixed;
    background: #f4f5f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header input.menu-toggle {
    display: none;
  }

  nav {
    position: absolute;
    text-align: center;
    top: 100%;
    left: 0;
    background-color: #f4f5f6;
    width: 100%;
    -webkit-transform: scale(1, 0);
    transform: scale(1, 0);
    -webkit-transition: -webkit-transform 400ms ease-in-out;
    transition: -webkit-transform 400ms ease-in-out;
    transition: transform 400ms ease-in-out;
    transition: transform 400ms ease-in-out, -webkit-transform 400ms ease-in-out;
    -webkit-transform-origin: top;
    transform-origin: top;
  }

  nav ul {
    margin: 0;
    margin-top: 14%;
    padding: 0;
    height: 90vh;
  }

  nav li {
    margin-left: 1rem;
    height: 10%;
    list-style: none;
  }

  nav a.active {
    color: #ff0084;
  }

  .menu-toggle:checked ~ nav {
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }

  .menu-toggle:checked ~ nav a {
    opacity: 1;
    -webkit-transition: opacity 200ms ease-in 100ms;
    transition: opacity 200ms ease-in 100ms;
  }

  .menu-nav-toggle {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-right: 2rem;
  }

  .menu-nav-toggle:hover,
  .menu-nav-toggle:focus {
    cursor: pointer;
  }

  .menu-nav-toggle span,
  .menu-nav-toggle span:before,
  .menu-nav-toggle span:after {
    display: block;
    background: #333;
    width: 2rem;
    border-radius: 0.125rem;
    position: relative;
    height: 0.25rem;
  }

  .menu-nav-toggle span:before,
  .menu-nav-toggle span:after {
    content: '';
    position: absolute;
  }

  .menu-nav-toggle span:before {
    top: 0.8rem;
  }

  .menu-nav-toggle span:after {
    bottom: 0.8rem;
  }

  .search-box {
    display: flex;
    max-width: 50rem; /* 最大の横幅を50remに設定 */
    width: 100%; /* 横幅を100%に設定して、コンテナの幅に合わせる */
    margin: 0 auto; /* センタリングのためのスタイル */
  }

  .search-box input {
    padding: 0rem 0.5rem;
    margin-top: 1.5rem;
    outline: none;
  }

  .search-box button {
    padding: 0rem 1rem;
    margin-top: 1.5rem;
    /* background-color: #333; */
    color: #fff;
    cursor: pointer;
  }

  @media screen and (min-width: 50rem) {
    .menu-nav-toggle {
      display: none;
    }
    header {
      display: -ms-grid;
      display: grid;
      -ms-grid-columns: 1fr auto minmax(37.5rem, 3fr) 1fr;
      grid-template-columns: 1fr auto minmax(37.5rem, 3fr) 1fr;
    }
    nav {
      all: unset;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
      grid-column: 3/4;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    nav ul {
      margin-top: 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: auto;
    }
    nav li {
      margin-bottom: 0;
      margin-left: 2rem;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: auto;
    }
    nav li {
      margin-bottom: 0;
      margin-left: 2rem;
    }
    nav a {
      opacity: 1;
    }
    .search-box {
      position: static;
      transform: none;
      grid-column: 2/3;
      margin: 0 auto;
    }
  }
</style>
