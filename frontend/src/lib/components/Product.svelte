<script lang="ts">
	import axios from 'axios';
	const types = ['basic', 'all'];

	export let _id = '';
	export let type = 'basic';
	if (!types.includes(type)) {
		type = 'basic';
	}


	$: response_promise = axios({
		method: 'POST',
		url: `http://localhost:3000/product/get/${_id}`,
		headers: { 'Content-Type': 'application/json' },
		data: { method: type }
	});
</script>

{#await response_promise}
	pending
{:then response}
	{#if type === 'basic'}
		<div>
			_id: {response.data._id}<br />
			name: {response.data.name}<br />
			price: {response.data.price}<br />
			description: {response.data.description}
		</div>
	{:else if type === 'all'}
		<div>
			_id: {response.data._id}<br />
			name: {response.data.name}<br />
			price: {response.data.price}<br />
			description: {response.data.description}
			tags:{response.data.tags}<br />
			options:{response.data.options}<br />
			__v:{response.data.__v}<br />
			createdAt:{response.data.createdAt}<br />
			updatedAt:{response.data.updatedAt}<br />
		</div>
	{/if}
{/await}
