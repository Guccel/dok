<script>
  import { page } from '$app/stores';

  const load = fetch("http://localhost:3000/products/" + $page.params.slugs).then(res => res.json());
</script>

{#await load then product}
  <div>
    <img src="/favicon.png" alt="{product.name}">
    {product.name} ${product.price}
  </div>
{/await}