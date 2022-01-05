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
	import type { ProductAll_Type } from 'src/global';

	export let product_ids: Array<string>;

	let selectedProduct_id = '';
	let currentProduct: ProductAll_Type;

	let newProduct: ProductAll_Type = {
		name: null,
		price: null,
		description: null,
		tags: [],
		options: []
	};
	let newTag = '';

	let pageView: 'none' | 'view' | 'edit' | 'new' | 'delete' = 'none';
	let message = '';

	async function selectProduct(_id: string) {
		selectedProduct_id = _id;
		const response = await axios({
			method: 'POST',
			url: `http://localhost:3000/product/get/${selectedProduct_id}`,
			headers: { 'Content-Type': 'application/json' },
			data: { getInfo: 'all' }
		});
		currentProduct = response.data;
		pageView = 'view';
	}

	//! does not work
	async function editProduct_submit() {
		const response = await axios({
			method: 'PATCH',
			url: `http://localhost:3000/product/${selectedProduct_id}`,
			headers: { 'Content-Type': 'application/json' },
			data: currentProduct
		});
	}
	async function newProduct_submit() {
		if (!(newProduct.name && newProduct.price && newProduct.description)) {
			message = 'required field blank';
			return;
		}

		const response = await axios({
			method: 'POST',
			url: 'http://localhost:3000/product/create',
			headers: { 'Content-Type': 'application/json' },
			data: newProduct
		});
		if (response.status === 201) {
			newProduct = {
				name: null,
				price: null,
				description: null,
				tags: [],
				options: []
			};
			selectProduct(response.data._id);
		}
		message = '';
	}
</script>

{#if pageView === 'none'}
	select product to begin
{:else if pageView === 'view'}
	Name: {currentProduct.name}<br />
	Price: {currentProduct.price}<br />
	Rating: {currentProduct.rating}<br />
	Description:{currentProduct.description}<br />
	Tags: {currentProduct.tags}<br />
	Options: {currentProduct.options}
{:else if pageView === 'edit'}
	Name:<input type="text" bind:value={currentProduct.name} /><br />
	Price:<input type="text" bind:value={currentProduct.price} /><br />
	Rating:<input type="text" bind:value={currentProduct.rating} /><br />
	Description:<input type="text" bind:value={currentProduct.description} /><br />
	Tags: {currentProduct.tags}<br />
	Options: {currentProduct.options}<br />
	<button on:click={editProduct_submit}>confirm</button>
{:else if pageView === 'new'}
	<label for="name">name</label>
	<input name="name" type="text" bind:value={newProduct.name} />
	<br />
	<label for="price">price</label>
	<input name="price" type="text" bind:value={newProduct.price} />
	<br />
	<label for="description">description</label>
	<input name="description" type="text" bind:value={newProduct.description} />
	<br />

	<label for="tags"> tags: </label>
	<ul>
		{#each newProduct.tags as tag, i}
			<li>
				{tag}
				<button
					on:click={() => {
						newProduct.tags.splice(i, 1);
						newProduct.tags = newProduct.tags; // need this line for reactivity
					}}
				>
					remove
				</button>
			</li>
		{/each}
		<li>
			<input bind:value={newTag} type="text" />
			<button
				on:click={() => {
					if (newTag != '') {
						newProduct.tags = [...newProduct.tags, newTag];
						newTag = '';
					}
				}}
			>
				add
			</button>
		</li>
	</ul>

	<label for="options">options</label>
	<input name="options" type="text" />
	<br />
	{message}<br />
	<button on:click={newProduct_submit}>create prodcut</button>
{/if}
<br />
<button
	on:click={() => {
		// change pageView to 'edit'
		if (selectedProduct_id == '') return;
		pageView = 'edit';
	}}>edit</button
>
<button
	on:click={() => {
		// change pageView to 'delete'
		if (selectedProduct_id == '') return;
		pageView = 'delete';
	}}>delete</button
>
<button
	on:click={() => {
		// change pageView to 'new'
		pageView = 'new';
	}}>new</button
>
<br /> <br />

{#each product_ids as _id}
	<button on:click={() => selectProduct(_id)}>
		<Product {_id} type="basic" />
	</button>
	<br />
{/each}
