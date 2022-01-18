<script>
  import { page } from '$app/stores';
  import axios from 'axios';
  import { onMount } from 'svelte';

  export let product_info = [];

  onMount(async () => {
    return await axios({
      method: 'POST',
      url: `http://localhost:3000/product/get/${$page.params.slugs}`,
      headers: { 'Content-Type': 'application/json' },
      data: { method: 'all' }
    }).then((res) => product_info = res.data)
  })
</script>

{#await product_info then product}
  <div>
    <img src="/favicon.png" alt="{product.name}">
    {product.name} ${product.price}
  </div>
{/await}