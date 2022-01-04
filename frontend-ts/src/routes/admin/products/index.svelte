<script context="module">
	export async function load() {
		const response = await axios({
			method: 'POST',
			url: 'http://localhost:3000/product',
			headers: { 'Content-Type': 'application/json' },
			data: {}
		});

		return {
			props: {
				product_ids: response.data._ids
			}
		};
	}
</script>

<script lang="ts">
	import axios from 'axios';

	import Product from '$lib/components/Product.svelte';

	export let product_ids: Array<string>;

	let selectedProduct = '';

	function getProduct(product) {
		selectedProduct = product;
	}
	function editProduct() {}
	function deleteProduct() {}
	function newProduct() {}
</script>

{#if selectedProduct != ''}
	{selectedProduct}
	<!-- TODO doesnt update dynamically  -->
	<Product _id={selectedProduct} type="basic" />
{/if}
<br />
<button on:click={editProduct}>edit</button>
<button on:click={deleteProduct}>delete</button>
<button on:click={newProduct}>new</button>
<br /> <br />

{#each product_ids as _id}
	<button on:click={() => getProduct(_id)}>
		<Product {_id} type="basic" />
	</button>
	<br />
{/each}
