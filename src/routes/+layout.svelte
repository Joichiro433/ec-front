<script lang="ts">
  import { page } from '$app/stores';
  import Header from '$lib/components/header.svelte';

  export let data;

  console.log(data.isLoggedIn, 'layout');
</script>

<Header>
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
    {#if data.isLoggedIn}
      <li>
        <a class:active={$page.url.pathname === '/orders'} href="/orders">
          <i class="fa-solid fa-clock" /> Orders
        </a>
      </li>
    {/if}
    {#if data.isLoggedIn}
      <li>
        <a class:active={$page.url.pathname === '/login'} href="/login">
          <i class="fa-solid fa-user" />
          {data.user.email.length > 13 ? `${data.user.email.substring(0, 10)}...` : data.user.email}
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
</Header>

<main class="container" style="padding-top: 80px;">
  <slot />
</main>

<style>
  ul {
    margin: 0;
    margin-top: 14%;
    padding: 0;
    height: 90vh;
  }

  li {
    margin-left: 1rem;
    height: 10%;
    list-style: none;
  }

  a.active {
    color: #ff0084;
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
    ul {
      margin-top: 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: auto;
    }
    li {
      margin-bottom: 0;
      margin-left: 2rem;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: auto;
    }
    li {
      margin-bottom: 0;
      margin-left: 2rem;
    }
    a {
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
