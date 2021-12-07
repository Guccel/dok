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
      <p>{product.name} ${product.price}</p>
    {/each}
  </div>
{/await}