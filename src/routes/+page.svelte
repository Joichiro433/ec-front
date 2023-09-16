<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';
  export let data;

  console.log(data.isLoggedIn);

  interface Product {
    name: string;
    description: string;
    price: number;
    author: string;
    image_url: string;
    id: string;
  }

  let products: Product[] = [];
  let currentPage: number = 1;
  const limit: number = 20;
  let totalPages: number = 0;

  async function fetchProducts(page: number): Promise<void> {
    try {
      const response = await axios.get<Product[]>(
        `https://127.0.0.1:8000/api/products/?skip=${(page - 1) * limit}&limit=${limit}`
      );
      products = response.data;
      // サンプルのため総ページ数を固定
      totalPages = 5; // 実際のAPIから総ページ数を取得する場合は適切に変更してください
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam) {
      currentPage = Number(pageParam);
    }

    fetchProducts(currentPage);
  });

  function setPage(page: number) {
    currentPage = page;

    // URLのクエリパラメータを更新
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(currentPage));
    window.history.pushState({}, '', '?' + params.toString());

    fetchProducts(currentPage);
    window.scrollTo(0, 0);
  }
</script>

<div class="product-list">
  {#each products as product}
    <a href={`/products/${product.id}`} class="product-card" rel="prefetch">
      <div class="product-image-wrapper">
        <img class="product-image" src={product.image_url} alt={product.name} />
      </div>
      <div class="product-details">
        <h2>{product.name}</h2>
        <p class="description">
          {product.description.length > 120 ? `${product.description.substring(0, 117)}...` : product.description}
        </p>
        <p class="price">￥{product.price.toLocaleString()}</p>
        <p class="author">Author: {product.author}</p>
      </div>
    </a>
  {/each}
</div>

<div class="pagination">
  <button on:click={() => setPage(currentPage - 1)} disabled={currentPage === 1}>&lt;&lt;</button>
  {#each Array(totalPages) as _, index (index)}
    <button on:click={() => setPage(index + 1)} class={index + 1 === currentPage ? 'active' : ''}>{index + 1}</button>
  {/each}
  <button on:click={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;&gt;</button>
</div>

<style>
  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .product-card {
    height: 330px;
    display: flex;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 16px;
    border-radius: 8px;
    width: 100%;
    transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
    text-decoration: none; /* アンダーラインを除去 */
    color: inherit; /* テキストの色を維持 */
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    background-color: rgba(155, 77, 202, 0.1);
  }

  h2 {
    font-size: 1.5em;
    color: #9b4dca;
  }

  .product-image-wrapper {
    flex: 0 0 20%;
    overflow: hidden;
    position: relative;
  }

  .product-image {
    width: 100%;
    object-fit: contain;
    object-position: center;
    vertical-align: bottom;
  }

  .product-details {
    flex: 1;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price {
    font-weight: bold;
    margin-top: 8px;
  }

  .author {
    color: #888;
    margin-top: 8px;
  }

  .pagination {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 2rem 0;
  }

  .pagination button {
    padding: 8px 12px;
    border: none;
    background-color: #d1d1d1;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .pagination button:hover {
    background-color: rgba(155, 77, 202, 0.1);
  }

  .pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .pagination button.active {
    background-color: #9b4dca;
    color: white;
  }
</style>
