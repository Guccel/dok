<script context="module">
  export async function load() {
    let products = await getProducts();
    return {
      props: {
        products: products.product_list,
      },
    };
  }
</script>

<script>
  import { getProducts } from '$lib/utils/admin/products.js';

  export let products;

  let i = 0;
  let selectedProduct = '';

  function getProduct(product) {
    selectedProduct = product;
  }
  function editProduct() {}
  function deleteProduct() {}
  function newProduct() {}
</script>

{JSON.stringify(selectedProduct)}
<br>
<button on:click={editProduct}>edit</button>
<button on:click={deleteProduct}>delete</button>
<button on:click={newProduct}>new</button>
<br /> <br />

{#each products as product}
  {JSON.stringify(product)}
  <button on:click={getProduct(product)}>Select</button>
  <br />
{/each}
