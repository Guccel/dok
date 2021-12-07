<script>  
  const load = fetch("http://localhost:3000/products").then(res => res.json());
</script>

<svelte:head>
  <title>Products</title>
</svelte:head>

<h1>Products</h1>

{#await load then data}
  <div>
    {#each data.products as product}
      <a href="/products/{product._id}">
        <img alt="bepis" src="/favicon.png">
        <p>{product.name} ${product.price}</p>
      </a>
    {/each}
  </div>
{/await}