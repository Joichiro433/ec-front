<script lang="ts">
  import axios from 'axios';
  import Api from '$lib/api/index.js';

  export let data;

  const addToCart = async () => {
    const response = await axios.get('https://127.0.0.1:8000/api/is-logged-in', {
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    });
    console.log(response.data);
    alert(response.data);
  };
</script>

<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>

<div class="product-detail">
  <img src={data.product.image_url} alt={data.product.name} class="product-image" />
  <div class="product-info">
    <h2>{data.product.name}</h2>
    <p class="author">Author: {data.product.author}</p>
    <div class="price-and-cart">
      <p class="price">￥{data.product.price.toLocaleString()}</p>
      <button class="add-to-cart" on:click={addToCart}><i class="fa-solid fa-cart-shopping" /> Add To Cart </button>
    </div>
    <p class="description">{data.product.description}</p>
  </div>
</div>

<style>
  .product-detail {
    display: flex;
    gap: 24px;
    align-items: flex-start; /* 上部揃えのための変更 */
    height: 80vh; /* viewportの高さと同じにすることで、中央揃えがうまくいく */
    justify-content: center;
    margin-top: 5vh; /* 画面の高さの5%だけコンテンツを下に移動させる */
  }

  .product-image {
    flex: 1;
    object-fit: contain; /* ここを変更 */
    max-width: 50%;
    border-radius: 8px;
    /* max-height: 500px; 必要に応じて高さの最大値を設定 */
  }

  .product-info {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 80vh; /* viewportの高さと同じにする */
    overflow-y: auto; /* スクロールを可能にする */
  }

  h2 {
    font-size: 2em;
    color: #9b4dca;
    margin: 0;
  }

  .price {
    font-weight: bold;
    font-size: 25px;
    color: #ff0084;
  }

  .author {
    color: #888;
  }

  .description {
    white-space: pre-line;
  }

  .add-to-cart {
    padding: 10px 20px;
    cursor: pointer;
    align-self: flex-start;
  }

  .add-to-cart:hover {
    background-color: #8133a0;
  }

  .price-and-cart {
    display: flex;
    align-items: center;
    gap: 16px; /* この値を調整して、価格とボタンの間の間隔を変更 */
  }

  button {
    padding: 1rem 4rem;
    border-radius: 100vmax;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background: linear-gradient(45deg, #daaf08 0%, #daaf08 45%, #fee9a0 70%, #daaf08 85%, #daaf08 90% 100%);
    background-size: 800% 400%;
    animation: gradient 10s infinite cubic-bezier(0.62, 0.28, 0.23, 0.99) both;
    color: #fff;
    border: 0;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
</style>
