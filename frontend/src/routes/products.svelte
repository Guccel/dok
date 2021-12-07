<script>
  import { onMount } from "svelte";

  let products;

  onMount(async () => {
    const res = await fetch('http://localhost:3000/products')
    const json = await res.json()

    products = json
  });
</script>

<svelte:head>
  <title>Products</title>
</svelte:head>

<h1>Products</h1>