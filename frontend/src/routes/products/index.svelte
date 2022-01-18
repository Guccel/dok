<script>
  import axios from 'axios';
  import { onMount } from 'svelte';

  export let product_ids = [];

  onMount(async () => {
    await axios({
      method: 'POST',
      url: 'http://localhost:3000/product',
      headers: { 'Content-Type': 'application/json' },
      data: { method: 'all' }
    }).then((res) => {product_ids = res.data._ids})
  })

  /*async function getProductName(product_id){
    await axios({
      method: 'POST',
      url: `http://localhost:3000/product/get/${product_id}`,
      headers: { 'Content-Type': 'application/json' },
      data: { method: 'all' }
    }).then((res) => {return res.data.name})
  }*/
</script>

{#await product_ids then data}
  {#each data as pid}
    <a href="/products/{pid}">
      <img alt="bepis" src="/favicon.png">
      <p>Product Name</p> <!-- idk ill do this later-->
    </a>
  {/each}
{/await}
